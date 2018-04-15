import React, { Component } from 'react';

import SimilarNode from './SimilarNode';
import { Grid } from 'semantic-ui-react';

import AccountStore from '../../stores/AccountStore';

class SimilarNodes extends Component {

	constructor(){
		super();

		this.renderRow = this.renderRow.bind(this);
		this.renderRows = this.renderRows.bind(this);
		this.renderRowCells = this.renderRowCells.bind(this);
		this.getDataset = this.getDataset.bind(this);

		this.state = {
			dataset: {}
		};
	}

	componentDidMount(){
		this.getDataset();
		AccountStore.on("change", this.getDataset);
	}

	componentWillUnmount(){
		AccountStore.removeListener("change", this.getDataset);
	}

	getDataset(){
		this.setState({ dataset: AccountStore.getDataset() });
	}

	renderRow(rowIndex, numberOfCells){
		var startNodeIndex = rowIndex * this.props.itemsPerRow;

		return(
			<Grid.Row key={rowIndex}>
				{this.renderRowCells(rowIndex, numberOfCells)}
			</Grid.Row>
		);
	}

	renderRowCells(rowIndex, numberOfCells){
		var cells = [];
		var startNodeIndex = rowIndex * this.props.itemsPerRow;

		for(var i=0; i<numberOfCells; i++){
			cells.push(
				<Grid.Column key={i}>
					<SimilarNode rowId={rowIndex} colId={i} dataset={this.state.dataset} similarNode={this.props.similarNodes[startNodeIndex + i]}/>
				</Grid.Column>
			);
		}

		return cells;
	}

	renderRows(){
		var rows = [];
		var rowCount = Math.floor(this.props.similarNodes.length / this.props.itemsPerRow);
		var lastItemsCount = this.props.similarNodes.length - (rowCount * this.props.itemsPerRow);

		for(var i=0; i<rowCount; i++){
			rows.push(this.renderRow(i, this.props.itemsPerRow));
		}

		rows.push(this.renderRow(rowCount, lastItemsCount));

		return rows;
	}

	render(){
		return(
			<div className="col">
				<Grid columns={this.props.itemsPerRow} divided>
					{this.renderRows()}
				</Grid>
			</div>
		);
	}

}

export default SimilarNodes;
