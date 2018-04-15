import React, { Component } from 'react';

import AccountStore from '../../stores/AccountStore';
import SetupStore from '../../stores/SetupStore';

import NodeSet from './NodeSet';

class SimilarityScore extends Component {

	constructor(){
		super();

		this.getDataset = this.getDataset.bind(this);
		this.getNodeSetQuerys = this.getNodeSetQuerys.bind(this);

		this.state = {
			dataset: {},
			nodeSetQueryA: 'RETURN 1',
			nodeSetQueryB: 'RETURN 1'
		};
	}

	componentDidMount(){
		this.getDataset();
		this.getNodeSetQuerys();
		AccountStore.on("change", this.getDataset);
		SetupStore.on("change", this.getNodeSetQuerys);
	}

	componentWillUnmount(){
		AccountStore.removeListener("change", this.getDataset);
		SetupStore.removeListener("change", this.getNodeSetQuerys);
	}

	getDataset(){
		this.setState({ dataset: AccountStore.getDataset() });
	}

	getNodeSetQuerys(){
		this.setState({ 
			nodeSetQueryA: SetupStore.getNodeSetQueryA(),
			nodeSetQueryB: SetupStore.getNodeSetQueryB()
		});
	}

	render() {
		return (
			<div className="row">
				<div className="col" style={{marginRight: 10 + 'px'}}>
					<NodeSet title='Node Set A' dataset={this.state.dataset} graphId='01' cypherQuery={this.state.nodeSetQueryA} />
				</div>
				<div className="col" style={{marginLeft: 10 + 'px'}}>
					<NodeSet title='Node Set B' dataset={this.state.dataset} graphId='02' cypherQuery={this.state.nodeSetQueryB} />
				</div>
			</div>
		);
	}
	
}

export default SimilarityScore;
