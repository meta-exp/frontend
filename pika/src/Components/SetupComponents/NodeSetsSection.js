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
		this.removeNodeFromNodeSetA = this.removeNodeFromNodeSetA.bind(this);
		this.removeNodeFromNodeSetB = this.removeNodeFromNodeSetB.bind(this);

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
		this.getNodeSetQuerys();
		SetupStore.on("change", this.getNodeSetQuerys);
		SetupStore.on("change", this.getNodeSets);
		AccountStore.on("change", this.getDataset);
	}

	componentWillUnmount(){
		SetupStore.removeListener("change", this.getNodeSetQuerys);
		SetupStore.removeListener("change", this.getNodeSets);
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
		SetupActions.sendNodeSets(SetupStore.extractIdList(this.state.nodeSetA), SetupStore.extractIdList(this.state.nodeSetB));
	}

	removeNodeFromNodeSetA(node){
		SetupActions.removeNodeFromNodeSetA(node);
	}

	removeNodeFromNodeSetB(node){
		SetupActions.removeNodeFromNodeSetB(node);
	}

	render() {
		return (
			<div>
				<div className="row" style={{marginTop: 20 + 'px'}}>
					<div className="col">
						<div>
							<h3>Node Set A</h3>
							<Neo4jGraphRenderer divId="2" onClick={(event, node) => this.removeNodeFromNodeSetA(node)} url={this.state.dataset.url} user={this.state.dataset.username} password={this.state.dataset.password} query={this.state.nodeSetQueryA} />
						</div>
					</div>
					<div className="col">
						<div>
							<h3>Node Set B
							<Button floated='right'  onClick={(e) => this.saveNodeSets(e)} style={{marginLeft: 20 + 'px'}} icon primary>
								<Icon name='save' />
								<span style={{marginLeft: 10 + 'px'}}>Save Node Sets</span>
							</Button>
							</h3>
							<Neo4jGraphRenderer divId="3" onClick={(event, node) => this.removeNodeFromNodeSetB(node)} url={this.state.dataset.url} user={this.state.dataset.username} password={this.state.dataset.password} query={this.state.nodeSetQueryB} />
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}

export default NodeSetsSection;
