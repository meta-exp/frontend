import React, { Component } from 'react';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';
import { Button, Icon, Dimmer, Loader } from 'semantic-ui-react';

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
		this.isComputingMetaPaths = this.isComputingMetaPaths.bind(this);
		this.clearNodeSetA = this.clearNodeSetA.bind(this);
		this.clearNodeSetB = this.clearNodeSetB.bind(this);

		this.state = {
			dataset: {},
			nodeSetQueryA: 'RETURN 1',
			nodeSetQueryB: 'RETURN 1',
			nodeSetA: [],
			nodeSetB: [],
			computingMetaPaths: false
		};
	}

	componentDidMount(){
		this.getDataset();
		this.getNodeSetQuerys();
		SetupStore.on("change", this.getNodeSetQuerys);
		SetupStore.on("change", this.getNodeSets);
		SetupStore.on("change", this.isComputingMetaPaths);
		AccountStore.on("change", this.getDataset);
	}

	componentWillUnmount(){
		SetupStore.removeListener("change", this.getNodeSetQuerys);
		SetupStore.removeListener("change", this.getNodeSets);
		AccountStore.removeListener("change", this.getDataset);
	}

	isComputingMetaPaths(){
		this.setState({ computingMetaPaths: SetupStore.isComputingMetaPaths() });
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

		if(this.state.nodeSetA.length == 0 || this.state.nodeSetB.length == 0){
			alert("Error: Both Node Sets cannot be empty. Please select some Entities.");
		}
		else{
			SetupActions.updateComputingMetaPaths(true);
			SetupActions.sendNodeSets(SetupStore.extractIdList(this.state.nodeSetA), SetupStore.extractIdList(this.state.nodeSetB),
									  SetupStore.extractTypeOfNodeSet(this.state.nodeSetA), SetupStore.extractTypeOfNodeSet(this.state.nodeSetB));
		}
		
	}

	removeNodeFromNodeSetA(node){
		SetupActions.removeNodeFromNodeSetA(node);
	}

	removeNodeFromNodeSetB(node){
		SetupActions.removeNodeFromNodeSetB(node);
	}

	clearNodeSetA(e){
		SetupActions.clearNodeSetA();
	}

	clearNodeSetB(e){
		SetupActions.clearNodeSetB();
	}

	render() {
		if(this.state.computingMetaPaths){
			return(
				<Dimmer active inverted>
					<Loader inverted>
						Saved Node Sets. Computing Meta-paths between Node Sets.<br />
						That could take a few moments ...
					</Loader>
				</Dimmer>
			);
		}
		
		return (
			<div>
				<div className="row" style={{marginTop: 20 + 'px'}}>
					<div className="col">
						<div>
							<h3>
								<Icon name='share' />
								<span style={{marginLeft: 10 + 'px'}}>
									Node Set A
								</span>
								<Button onClick={(e) => this.clearNodeSetA(e)} style={{marginLeft: 20 + 'px'}} icon primary>
									<Icon name='remove' />
									<span style={{marginLeft: 10 + 'px'}}>Clear Node Set A</span>
								</Button>
							</h3>
							<Neo4jGraphRenderer divId="2" onClick={(event, node) => this.removeNodeFromNodeSetA(node)} url={this.state.dataset.url} user={this.state.dataset.username} password={this.state.dataset.password} query={this.state.nodeSetQueryA} />
						</div>
					</div>
					<div className="col">
						<div>
							<h3>Node Set B
								<Button onClick={(e) => this.clearNodeSetB(e)} style={{marginLeft: 20 + 'px'}} icon primary>
									<Icon name='remove' />
									<span style={{marginLeft: 10 + 'px'}}>Clear Node Set B</span>
								</Button>
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
