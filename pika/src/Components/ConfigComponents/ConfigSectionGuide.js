import React, {Component} from 'react';

import { Step, Icon } from 'semantic-ui-react';

class ConfigSectionGuide extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<h3>Usage Guide</h3>
				<Step.Group>
					<Step>
						<Icon name='hand pointer' />
						<Step.Content>
							<Step.Title>Include/Exclude Node/Edge types</Step.Title>
							<Step.Description>
								Include or exclude node and edge types depending on their relevance
								regarding your research question.
							</Step.Description>
						</Step.Content>
					</Step>
					<Step>
						<Icon name='share' />
						<Step.Content>
							<Step.Title>Go on and rate meta-paths</Step.Title>
							<Step.Description>
								Go to next page and rate your remaining meta-paths. Your selection of
								node and edge types was stored automatically.
							</Step.Description>
						</Step.Content>
					</Step>
				</Step.Group>
			</div>
		);
	}

}

export default ConfigSectionGuide;