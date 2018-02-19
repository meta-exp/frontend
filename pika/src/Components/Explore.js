import React, { Component } from 'react';
import MetaPathDisplay from './MetaPathComponents/MetaPathDisplay';

class Explore extends Component {



	render() {
		return (
			<div>
				<h1>Explore</h1>
        <div>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        <br/>
        <br/>
        </div>
        <MetaPathDisplay
					userName={this.props.userName}
					similarityType={this.props.similarityType}
					dataset={this.props.dataset}/>
			</div>
		);
	}

}

export default Explore;
