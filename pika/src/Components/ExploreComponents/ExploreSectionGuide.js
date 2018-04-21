import React, {Component} from 'react';

import { Step, Icon } from 'semantic-ui-react';

class ExploreSectionGuide extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{margin: 20 + 'px ' + 0 + 'px'}}>
				<h3>Usage Guide</h3>
				<Step.Group>
					<Step>
						<Icon name='settings' />
						<Step.Content>
							<Step.Title>Set Hyperparameters</Step.Title>
							<Step.Description>
								Select numer of meta-paths the user has to rate simultaniously.<br />
								Select a relative or absolute rating method. If you choose relative rating<br />
								you can change the value of the minimal and maximal rated meta-path, so that<br />
								you can rescale your rating scala.
							</Step.Description>
						</Step.Content>
					</Step>
					<Step>
						<Icon name='options' />
						<Step.Content>
							<Step.Title>Rate a Meta-Path Batch</Step.Title>
							<Step.Description>
								Rate each meta-path in comparison to the other meta-paths in a batch.<br />
								Additionally, if you chose a relative rating method, rate them in <br />
								comparison to the overall minimum and maximum. To add a meta-path to <br />
								the rating scala, click on its ID-Button, then drag it to the desired <br />
								scala position. Do this for each meta-path and 'confirm your rating'.
							</Step.Description>
						</Step.Content>
					</Step>
					<Step>
						<Icon name='repeat' />
						<Step.Content>
							<Step.Title>Repeat Rating Batches and Finish</Step.Title>
							<Step.Description>
								Repeatly rate batches until you want to 'Stop Rating'. We recommend to<br />
								rate some more meta-paths in order to imporve prediction accuracy.<br />
								Similarity indicators will be computed and shown on the next page.
							</Step.Description>
						</Step.Content>
					</Step>
				</Step.Group>
			</div>
		);
	}

}

export default ExploreSectionGuide;