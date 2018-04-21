import React, { Component } from 'react';

import ExploreSectionGuide from './ExploreSectionGuide';
import MetaPathDisplay from './MetaPathDisplay';

class Explore extends Component {

	render() {
		return (
			<div>
				<h1>Explore</h1>
				<ExploreSectionGuide />
        <MetaPathDisplay />
			</div>
		);
	}

}

export default Explore;
