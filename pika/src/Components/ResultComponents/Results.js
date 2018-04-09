import React, { Component } from 'react';

import NodeSet from './NodeSet';
import ContributingMetaPaths from './ContributingMetaPaths';
import MetaPathDetails from './MetaPathDetails';

import { Table } from 'semantic-ui-react';

import ResultStore from '../../stores/ResultStore';
import ResultActions from '../../actions/ResultActions';

class Results extends Component {

	constructor(){
		super();

		this.getSimilarityScore = this.getSimilarityScore.bind(this);
		this.getNodeSetQueries = this.getNodeSetQueries.bind(this);
		this.getContributingMetaPaths = this.getContributingMetaPaths.bind(this);
		this.getMetaPathDetails = this.getMetaPathDetails.bind(this);

		this.state = {
			similarity_score: 0.0,
			first_node_set_query: 'MATCH (n) RETURN n',
			second_node_set_query: 'MATCH (n) RETURN n',
			contributing_meta_paths: [],
			meta_path_details: {
				"id": 0,
				"label": "Meta-Path 0",
				"value": 0,
				"color": "hsl(341, 70%, 50%)"
			}
		};
	}

	componentWillMount(){
		ResultActions.fetchSimilarityScore();
		ResultActions.fetchFirstNodeSetQuery();
		ResultActions.fetchSecondNodeSetQuery();
		ResultActions.fetchContributingMetaPaths();
	}

	componentDidMount(){
		ResultStore.on("change", this.getSimilarityScore);
		ResultStore.on("change", this.getNodeSetQueries);
		ResultStore.on("change", this.getContributingMetaPaths);
		ResultStore.on("change", this.getMetaPathDetails);
	}

	componentWillUnmount(){
		ResultStore.removeListener("change", this.getSimilarityScore);
		ResultStore.removeListener("change", this.getNodeSetQueries);
		ResultStore.removeListener("change", this.getContributingMetaPaths);
		ResultStore.removeListener("change", this.getMetaPathDetails);
	}

	getSimilarityScore(){
		this.setState({ similarity_score: ResultStore.getSimilarityScore() });
	}

	getNodeSetQueries(){
		this.setState({
			first_node_set_query: ResultStore.getFirstNodeSetQuery(),
			second_node_set_query: ResultStore.getSecondNodeSetQuery(),
			contributing_meta_paths: ResultStore.getContributingMetaPaths()
		});
	}

	getContributingMetaPaths(){
		this.setState({ contributing_meta_paths: ResultStore.getContributingMetaPaths() });
	}

	getMetaPathDetails(){
		this.setState({ meta_path_details: ResultStore.getMetaPathDetails() });
	}

	render() {
		return (
			<div>
				<h1>Results</h1>
				<div className="row">
					<div className="col" style={{marginRight: 10 + 'px'}}> 
						<NodeSet cypherQuery={this.state.first_node_set_query} title="Node Set A" />
					</div> 
					<div className="col" style={{marginLeft: 10 + 'px', textAlign: 'right'}}> 
						 <NodeSet cypherQuery={this.state.second_node_set_query} title="Node Set B" />
					</div>
				</div>
				<div className="row" style={{marginTop: 20 + 'px'}}>
					<div className="col">
						<h3>Similarity Score: {this.state.similarity_score}</h3>
					</div>
				</div>
				<div className="row" style={{marginTop: 20 + 'px'}}>
					<div className="col">
						<h3>Contributing Meta-Paths</h3>
						<ContributingMetaPaths metaPathData={this.state.contributing_meta_paths} />
					</div>
					<div className="col">
						<h3>Meta-Path Details</h3>
						<MetaPathDetails details={this.state.meta_path_details} />
					</div>
				</div>
			</div>
		);
	}
	
}

export default Results;