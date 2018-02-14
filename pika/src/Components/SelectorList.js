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
    const selectionRows = this.props.items.map(([itemName, selected], index) => this.buildSelectionRows(itemName, selected, index));

    return (
      <tbody>
        {selectionRows}
      </tbody>
    );
  }

  buildSelectionRows(itemName, selected, index) {
    return (
			<tr>
					<td>
            {itemName}
          </td>
          <td class="float-right">
            <input type="checkbox" class="toggle-button" checked={selected} onChange={() => this.props.onChange(index)}/>
          </td>
			</tr>
		);
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
