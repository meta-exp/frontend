import React, { Component } from 'react';

import { Card, Button, Icon, Grid } from 'semantic-ui-react';

class SearchSectionGuide extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="col">
				<h3>Usage Guide</h3>
				<Grid divided='vertically'>
					<Grid.Row columns={3}>
						<Grid.Column>
							Step 1
						</Grid.Column>
						<Grid.Column>
							Step 2
						</Grid.Column>
						<Grid.Column>
							Step 3
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}

}

export default SearchSectionGuide;