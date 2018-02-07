import React, { Component } from 'react';

class SelectorList extends Component {

  buildTableHead(itemNames, checkNote) {
    return (
      <thead>
        <th>{itemNames}</th>
        <th class="text-right">{checkNote}</th>
      </thead>
		);
  }

  buildTableBody(items){
    const selectionRows = this.props.items.map(([itemName, selected], index) => this.buildSelectionRows(itemName, selected));

    return (
      <tbody>
        {selectionRows}
      </tbody>
    );
  }

  buildSelectionRows(itemName, selected) {
    return (
			<tr>
					<td>
            {itemName}
          </td>
          <td class="float-right">
            <input type="checkbox" class="toggle-button" checked={selected} onChange={this.handleChange.bind(this)}/>
          </td>
			</tr>
		);
  }

  handleChange() {
    alert('I really can\'t handle all this change!');
  }

  render() {
    const tableHead = this.buildTableHead(this.props.item_names, this.props.check_note);
    const tableBody = this.buildTableBody(this.props.items);
    return (
      <table class="table table-striped type-preference-table">
        {tableHead}
        {tableBody}
      </table>
    );
  }

}

export default SelectorList;
