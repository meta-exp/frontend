import React, { Component } from 'react';

import { Step, Button, Icon } from 'semantic-ui-react';

class SearchSectionGuide extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<h3>Usage Guide</h3>
				<Step.Group>
					<Step>
						<Icon name='search' />
						<Step.Content>
							<Step.Title>Search for Entities</Step.Title>
							<Step.Description>
								Search for entities of interest regarding your research<br />
								question through a cypher query.
							</Step.Description>
						</Step.Content>
					</Step>
					<Step>
						<Icon name='hand pointer' />
						<Step.Content>
							<Step.Title>Select Entities</Step.Title>
							<Step.Description>
								Refine your selection of entities through clicking on them<br />
								and adding them to a node set.
							</Step.Description>
						</Step.Content>
					</Step>
					<Step>
						<Icon name='share' />
						<Step.Content>
							<Step.Title>Save your Selection</Step.Title>
							<Step.Description>
								Delete entities from a node set through clicking on them.<br />
								If you have finished your entity selection, click 'Save Node Sets' .
							</Step.Description>
						</Step.Content>
						</Step>
				</Step.Group>
			</div>
		);
	}

}

export default SearchSectionGuide;