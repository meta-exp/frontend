import React, { Component } from 'react';

import SearchNodesSection from './SearchNodesSection';
import ResultSetSection from './ResultSetSection';
import NodeSetsSection from './NodeSetsSection';

import SetupStore from '../../stores/SetupStore';
import AccountStore from '../../stores/AccountStore';

import './css/setup.css';

class Setup extends Component {

	constructor(){
		super();
	}

	render() {
		return (
			<div>
				<h1>Setup</h1>
				<div style={{margin: 20 + 'px ' + 0 + 'px'}}> 
					<SearchNodesSection /> 
				</div> 
				<div style={{margin: 20 + 'px ' + 0 + 'px'}}> 
					<ResultSetSection />
				</div> 
				<div style={{margin: 20 + 'px ' + 0 + 'px'}}> 
					<NodeSetsSection />
				</div>
			</div>
		);
	}

}

export default Setup;
