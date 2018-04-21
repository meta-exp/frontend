import React, { Component } from 'react';
import SelectorList from './SelectorList';
import ConfigSectionGuide from './ConfigSectionGuide';
import { Checkbox, Button, Icon } from 'semantic-ui-react';

import ConfigStore from '../../stores/ConfigStore';
import ConfigActions from '../../actions/ConfigActions';

class Config extends Component {

  constructor(props){
    super(props);

    this.getEntityTypes = this.getEntityTypes.bind(this);

    this.state = {
      node_types: [],
      edge_types: [],
    }
  }

  componentWillMount(){
    ConfigActions.fetchNodeTypes();
    ConfigActions.fetchEdgeTypes();
  }

  componentDidMount(){
    ConfigStore.on("change", this.getEntityTypes);
  }

  componentWillUnmount(){
    ConfigStore.removeListener("change", this.getEntityTypes);
  }

  getEntityTypes(){
    this.setState({ 
      node_types: ConfigStore.getNodeTypes(),
      edge_types: ConfigStore.getEdgeTypes()
    });
  }

  render() {
    return (
      <div>
        <h1>Config</h1>
        <div style={{marginTop: 20 + 'px'}}>
          <ConfigSectionGuide />
        </div>
        <div className='row' style={{marginTop:20+'px'}}>
          <div className="col">
            <h3>
              <Icon name='hand pointer' />
              <span style={{marginLeft: 10 + 'px'}}>
                Selection of Node and Edge Types
              </span>
            </h3>
            <SelectorList
              is_node_type_list={true}
              item_names='Node type'
              items={this.state.node_types} />
          </div>
          <div className="col">
            <SelectorList
              is_node_type_list={false}
              item_names='Edge type'
              items={this.state.edge_types} />
            <div style={{float: 'right'}}>
              <Icon name='share' />
              <b>Go on</b>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Config;
