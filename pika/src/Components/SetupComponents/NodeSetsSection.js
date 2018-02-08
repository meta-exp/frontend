import React, { Component } from 'react';

import NodeSet from './NodeSet';

class NodeSetsSection extends Component {

	render() {
		return (
			<div className="row">
				<div className="col">
					<NodeSet title="Node Set A" />
				</div>
				<div className="col">
					<NodeSet title="Node Set B" />
				</div>
			</div>
		);
	}
	
}

export default NodeSetsSection;