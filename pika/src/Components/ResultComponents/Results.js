import React, { Component } from 'react';

import { Table } from 'semantic-ui-react';

import ResultStore from '../../stores/ResultStore';
import ResultActions from '../../actions/ResultActions';

class Results extends Component {

	constructor(){
		super();

		this.getSimilarityScore = this.getSimilarityScore.bind(this);

		this.state = {
			similarity_score: 0.0
		};
	}

	componentWillMount(){
		ResultActions.fetchSimilarityScore();
	}

	componentDidMount(){
		ResultStore.on("change", this.getSimilarityScore);
	}

	componentWillUnmount(){
		ResultStore.removeListener("change", this.getSimilarityScore);
	}

	getSimilarityScore(){
		this.setState({ similarity_score: ResultStore.getSimilarityScore() });
	}

	render() {
		return (
			<div>
				<h1>Results</h1>
				<h3>Similarity Score: {this.state.similarity_score}</h3>
			</div>
		);
	}
	
}

export default Results;