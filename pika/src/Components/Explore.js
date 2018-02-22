import React, { Component } from 'react';
import MetaPathDisplay from './MetaPathComponents/MetaPathDisplay';

class Explore extends Component {



	render() {
		return (
			<div>
				<h1>Explore</h1>
        <MetaPathDisplay
					userName={this.props.userName}
					similarityType={this.props.similarityType}
					dataset={this.props.dataset}/>
			</div>
		);
	}

}

export default Explore;
