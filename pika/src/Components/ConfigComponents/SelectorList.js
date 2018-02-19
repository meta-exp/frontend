import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

class SelectorList extends Component {

  buildTableHead(itemNames, checkNote) {
    return (
      <thead>
        <tr>
          <th>{itemNames}</th>
          <th className="text-right">{checkNote}</th>
        </tr>
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
          <td className="float-right">
            <Checkbox toggle checked={selected} onChange={() => this.props.onChange(index)}/>
          </td>
			</tr>
		);
  }

  render() {
    const tableHead = this.buildTableHead(this.props.item_names, this.props.check_note);
    const tableBody = this.buildTableBody(this.props.items);

    return (
      <table className="table table-striped type-preference-table">
        {tableHead}
        {tableBody}
      </table>
    );
  }

}

export default SelectorList;