import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react';

class SimilarNodes extends Component {

	constructor(){
		super();
	}

	render(){
		return(
			<div>
				<Grid columns={3} divided>
					<Grid.Row>
						<Grid.Column>
							<h4>Test</h4>
						</Grid.Column>
						<Grid.Column>
							<h4>Test</h4>
						</Grid.Column>
						<Grid.Column>
							<h4>Test</h4>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<h4>Test</h4>
						</Grid.Column>
						<Grid.Column>
							<h4>Test</h4>
						</Grid.Column>
						<Grid.Column>
							<h4>Test</h4>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}

}

export default SimilarNodes;
