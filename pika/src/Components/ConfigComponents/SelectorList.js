import React, { Component } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';
import ConfigActions from '../../actions/ConfigActions';

class SelectorList extends Component {

  constructor(){
    super();
  }

  handleChange(index){
    if(this.props.is_node_type_list){
      ConfigActions.changeNodeTypeState(index);
      ConfigActions.sendNodeTypes(this.props.items);
    }
    else{
      ConfigActions.changeEdgeTypeState(index);
      ConfigActions.sendEdgeTypes(this.props.items);
    }
  }

  render() {
    return (
      <Table unstackable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{this.props.item_names}</Table.HeaderCell>
            <Table.HeaderCell textAlign='right'>Include?</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.items.map(([item, selected], index) => 
            <Table.Row key={index}>
              <Table.Cell>{item}</Table.Cell>
              <Table.Cell textAlign='right'>
                <Checkbox toggle defaultChecked={selected} onClick={(e) => this.handleChange(index)} />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }

}

export default SelectorList;
