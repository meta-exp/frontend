import React, { Component } from 'react';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';
import { Button, Icon } from 'semantic-ui-react';

import AccountStore from '../../stores/AccountStore';
import SetupStore from '../../stores/SetupStore';
import SetupActions from '../../actions/SetupActions';

class NodeSetsSection extends Component {

	constructor(){
		super();

		this.getDataset = this.getDataset.bind(this);
		this.getNodeSetQuerys = this.getNodeSetQuerys.bind(this);
		this.getNodeSets = this.getNodeSets.bind(this);
		this.saveNodeSets = this.saveNodeSets.bind(this);

		this.state = {
			dataset: {},
			nodeSetQueryA: 'RETURN 1',
			nodeSetQueryB: 'RETURN 1',
			nodeSetA: [],
			nodeSetB: []
		};
	}

	componentDidMount(){
		this.getDataset();
		SetupStore.on("change", this.getNodeSetQuerys);
		AccountStore.on("change", this.getDataset);
	}

	componentWillUnmount(){
		SetupStore.removeListener("change", this.getNodeSetQuerys);

		AccountStore.removeListener("change", this.getDataset);
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

	getNodeSets(){
		this.setState({
			nodeSetA: SetupStore.getNodeSetA(),
			nodeSetB: SetupStore.getNodeSetB()
		});
	}

	saveNodeSets(e){
		e.preventDefault();
		e.stopPropagation();
		alert("A: " + this.state.nodeSetA + "\nB:" + this.state.nodeSetB);
		SetupActions.sendNodeSets(this.state.nodeSetA, this.state.nodeSetB);
	}

	render() {
		return (
			<div>
				<div className="row" style={{marginTop: 20 + 'px'}}>
					<div className="col">
						<div>
							<h3>Node Set A</h3>
							<Neo4jGraphRenderer onClick={(node) => console.log(node)} url={this.state.dataset.url} user={this.state.dataset.username} password={this.state.dataset.password} query={this.state.nodeSetQueryA} />
						</div>
					</div>
					<div className="col">
						<div>
							<h3>Node Set B
							<Button floated='right' onClick={(e) => this.saveNodeSets(e)} style={{marginLeft: 20 + 'px'}} icon primary>
								<Icon name='save' />
								<span style={{marginLeft: 10 + 'px'}}>Save Node Sets</span>
							</Button>
							</h3>
							<Neo4jGraphRenderer onClick={(node) => console.log(node)} url={this.state.dataset.url} user={this.state.dataset.username} password={this.state.dataset.password} query={this.state.nodeSetQueryB} />
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}

export default NodeSetsSection;
