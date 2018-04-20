import React, { Component } from 'react';
import MetaPathDisplay from './MetaPathDisplay';

class Explore extends Component {

	render() {
		return (
			<div>
				<h1 style={{marginBottom: 20 + 'px'}}>Explore</h1>
        		<MetaPathDisplay />
			</div>
		);
	}

}

export default Explore;
