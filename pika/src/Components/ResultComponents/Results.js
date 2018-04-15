import React, { Component } from 'react';

import NodeSet from './NodeSet';
import ContributingMetaPaths from './ContributingMetaPaths';
import MetaPathDetails from './MetaPathDetails';
import SimilarNodes from './SimilarNodes';
import SimilarityScore from './SimilarityScore';

import { Tab } from 'semantic-ui-react';

import ResultStore from '../../stores/ResultStore';
import ResultActions from '../../actions/ResultActions';

class Results extends Component {

	constructor(){
		super();

		this.getSimilarityScore = this.getSimilarityScore.bind(this);
		this.getContributingMetaPaths = this.getContributingMetaPaths.bind(this);
		this.getMetaPathDetails = this.getMetaPathDetails.bind(this);
		this.getSimilarNodes = this.getSimilarNodes.bind(this);
		this.changeMetaPathDetails = this.changeMetaPathDetails.bind(this);

		this.state = {
			similarity_score: 0.0,
			contributing_meta_paths: [],
			meta_path_details: {},
			similar_nodes: []
		};
	}

	componentWillMount(){
		ResultActions.fetchSimilarityScore();
		ResultActions.fetchContributingMetaPaths();
		ResultActions.fetchMetaPathDetails(1);
		ResultActions.fetchSimilarNodes();
	}

	componentDidMount(){
		ResultStore.on("change", this.getSimilarityScore);
		ResultStore.on("change", this.getContributingMetaPaths);
		ResultStore.on("change", this.getMetaPathDetails);
		ResultStore.on("change", this.getSimilarNodes);
	}

	componentWillUnmount(){
		ResultStore.removeListener("change", this.getSimilarityScore);
		ResultStore.removeListener("change", this.getContributingMetaPaths);
		ResultStore.removeListener("change", this.getMetaPathDetails);
		ResultStore.removeListener("change", this.getSimilarNodes);
	}

	getSimilarNodes(){
		this.setState({ similar_nodes: ResultStore.getSimilarNodes() });
	}

	getSimilarityScore(){
		this.setState({ similarity_score: ResultStore.getSimilarityScore() });
	}

	getContributingMetaPaths(){
		this.setState({ contributing_meta_paths: ResultStore.getContributingMetaPaths() });
	}

	getMetaPathDetails(){
		this.setState({ meta_path_details: ResultStore.getMetaPathDetails() });
	}

	changeMetaPathDetails(e,data){
		ResultActions.fetchMetaPathDetails(data.panes[data.activeIndex].meta_path_id);
	}

	render() {
		let metaPaths = this.state.contributing_meta_paths.map((meta_path, index) => {
			return { 
				menuItem: meta_path.label,
				meta_path_id: meta_path.id,
				render: () => 
					<Tab.Pane>
						<MetaPathDetails details={this.state.meta_path_details} />
					</Tab.Pane> 
			};
		});

		return (
			<div>
				<h1>Results</h1>
				<div className="row">
					<div className="col" style={{marginRight: 10 + 'px'}}> 
						
					</div> 
					<div className="col" style={{marginLeft: 10 + 'px', textAlign: 'right'}}> 
						 
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
						<Tab onTabChange={(e,data) => this.changeMetaPathDetails(e,data)} panes={metaPaths} />
					</div>
				</div>
				<div className="row" style={{marginTop: 20 + 'px'}}>
					<div className="col">
						<h3 style={{marginBottom: 20 + 'px'}}>Similar Nodes</h3>
						<SimilarNodes itemsPerRow={2} similarNodes={this.state.similar_nodes} />
					</div>
				</div>
			</div>
		);
	}
	
}

export default Results;

//<NodeSet cypherQuery={this.state.first_node_set_query} title="Node Set A" />