import React, { Component } from 'react';

import SearchNodesSection from './SearchNodesSection';
import ResultSetSection from './ResultSetSection';
import NodeSetsSection from './NodeSetsSection';

import SetupStore from '../../stores/SetupStore';

import './css/setup.css';

class Setup extends Component {

	constructor(){
		super();

		this.state = {
			cypherQuery: SetupStore.getCyperQuery()
		};
	}

	componentWillMount(){
		SetupStore.on("change", () => {
			this.setState({ cypherQuery: SetupStore.getCyperQuery() });
		})
	}

	render() {
		return (
			<div>
				<h1>Setup</h1>
				<div style={{margin: 20 + 'px ' + 0 + 'px'}}> 
					<SearchNodesSection /> 
				</div> 
				<div style={{margin: 20 + 'px ' + 0 + 'px'}}> 
					
				</div> 
				<div style={{margin: 20 + 'px ' + 0 + 'px'}}> 
					 
				</div>
			</div>
		);
	}

}

export default Setup;

//<ResultSetSection cypherQuery={this.state.cypherQuery} /> 
//<NodeSetsSection />