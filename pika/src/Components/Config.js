import React, { Component } from 'react';
import SelectorList from './SelectorList';

class Config extends Component {

  constructor(props){
    super(props);
    this.state = {
      node_types: [['Merkur', true], ['Venus', true], ['Erde', false], ['Mars', true]],
      edge_types: [['ISS', true], ['MIR', false]],
    }
  }

  setNodeTypes(node_types){
    this.state.node_types = node_types;
  }

  getNodeTypes(){
    return this.state.node_types.slice;
  }

  setEdgeTypes(edge_types){
    this.state.edge_types = edge_types;
  }

  getEdgeTypes(){
    return this.state.edge_types.slice;
  }

  switchValue(index, getter, setter){
    alert('I sense a smell of change in list '+list+' at index '+index)
    let list = getter();
    list[index][1] = !list[index][1];
    setter(list);
  }

  render() {
    return (
      <div>
        <h1>Config</h1>
        <h2>Welcome, it's so nice to have you here</h2>
        <div class='row' style={{marginTop:30+'px'}}>
          <div class="col" style={{marginLeft:15+'px'}}>
            <SelectorList
              item_names='Gurkenliste'
              check_note='Dabei oder nicht dabei?'
              items={this.state.node_types}
              onChange={(index) => {this.state.node_types[index][1] = !this.state.node_types[index][1]; alert(this.state.node_types)}}/>
          </div>
          <div class="col" style={{marginRight:15+'px'}}>
            <SelectorList
              item_names='Zuchiniliste'
              check_note='Dabei oder nicht dabei?'
              items={this.state.edge_types}
              onChange={(index) => {this.state.edge_types[index][1] = !this.state.edge_types[index][1]}}/>
          </div>
        </div>
      </div>
    );
  }

}

export default Config;
