import React, { Component } from 'react';

//import SearchNodesSection from './SearchNodesSection';
import ResultSetSection from './ResultSetSection';
import NodeSetsSection from './NodeSetsSection';

import './css/setup.css';

class Setup extends Component {

	constructor(){
		super();

		this.state = {
			cypherQuery: "RETURN 1"
		};
	}

	handleSearch = inputValue => {
		this.setState({cypherQuery: inputValue});
	}

	render() {
		return (
			<div>
				<h1>Setup</h1>
				
				<div style={{margin: 20 + 'px ' + 0 + 'px'}}>
					<ResultSetSection cypherQuery={this.state.cypherQuery} />
				</div>
				<div style={{margin: 20 + 'px ' + 0 + 'px'}}>
					<NodeSetsSection />
				</div>
			</div>
		);
	}
	
}

export default Setup;