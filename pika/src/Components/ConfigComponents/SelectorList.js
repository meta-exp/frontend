import React, { Component } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';

class SelectorList extends Component {

  constructor(){
    super();
  }

  switchState(index){
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
                <Checkbox toggle checked={selected} onChange={this.switchState(index)} />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }

}

export default SelectorList;
