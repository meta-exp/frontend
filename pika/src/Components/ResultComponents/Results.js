import React, { Component } from 'react';
import NodeSet from './NodeSet';
import { Table } from 'semantic-ui-react';
import ResultStore from '../../stores/ResultStore';
import ResultActions from '../../actions/ResultActions';

class Results extends Component {

	constructor(){
		super();

		this.getSimilarityScore = this.getSimilarityScore.bind(this);
		this.getNodeSetQueries = this.getNodeSetQueries.bind(this);

		this.state = {
			similarity_score: 0.0,
			first_node_set_query: 'MATCH (n) RETURN n',
			second_node_set_query: 'MATCH (n) RETURN n'
		};
	}

	componentWillMount(){
		ResultActions.fetchSimilarityScore();
		ResultActions.fetchFirstNodeSetQuery();
		ResultActions.fetchSecondNodeSetQuery();
	}

	componentDidMount(){
		ResultStore.on("change", this.getSimilarityScore);
		ResultStore.on("change", this.getNodeSetQueries);
	}

	componentWillUnmount(){
		ResultStore.removeListener("change", this.getSimilarityScore);
		ResultStore.removeListener("change", this.getNodeSetQueries);
	}

	getSimilarityScore(){
		this.setState({ similarity_score: ResultStore.getSimilarityScore() });
	}

	getNodeSetQueries(){
		this.setState({
			first_node_set_query: ResultStore.getFirstNodeSetQuery(),
			second_node_set_query: ResultStore.getSecondNodeSetQuery()
		});
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
				<div className="row">
					<div className="col">
						<h3>Similarity Score: {this.state.similarity_score}</h3>
					</div>
				</div>
			</div>
		);
	}
	
}

export default Results;