import React, { Component } from 'react';

import { Button, Icon, Progress, Transition } from 'semantic-ui-react';

class MetaPathDetails extends Component {

	constructor(){
		super();

		this.toggleInstances = this.toggleInstances.bind(this);

		this.state = {
			arrow_incon: 'arrow down',
			button_text: 'Show Instances',
			show_instances: false
		};
	}

	toggleInstances(){
		if(this.state.show_instances){
			this.setState({ 
				arrow_incon: 'arrow down',
				button_text: 'Show Instances',
				show_instances: false
			});
		}
		else{
			this.setState({ 
				arrow_incon: 'arrow up',
				button_text: 'Hide Instances',
				show_instances: true,
			});
		}
	}

	render(){
		let metaPathInstances = this.props.details.instance_queries.map((query, index) => {
			return(
				<li key={index}>
					<b>{index+1}. Instance Query:</b> {query}
				</li>
			);
		});

		return(
			<div>
				<div className="row">
					<div className="col-3">
						<Button icon primary={true}>
							<Icon name='trophy' />
							<span style={{marginLeft: 10 + 'px'}}>{this.props.details.contribution_ranking}</span>
						</Button>
					</div>
					<div className="col-2">
						<Button icon primary={false}>
							<Icon name='lab' />
							<span style={{marginLeft: 10 + 'px'}}>{this.props.details.contribution_value}%</span>
						</Button>
					</div>
					<div className="col-7">
						<Progress style={{marginTop: 10 + 'px'}} percent={this.props.details.contribution_value} success={true} />
					</div>
				</div>
				<div className="row" style={{marginTop: 20 + 'px'}}>
					<div className="col">
						<h4>Structural Value: <b>{this.props.details.structural_value}</b> instances</h4>
						<h4>Meta-Path:</h4><b>{this.props.details.meta_path}</b>
						<h4 style={{marginTop: 20 + 'px'}}>Instances:</h4>
						<Button onClick={(e) => this.toggleInstances()} icon primary={true}>
							<Icon name={this.state.arrow_incon} />
							<span style={{marginLeft: 10 + 'px'}}>{this.state.button_text}</span>
						</Button>
						<Transition visible={this.state.show_instances} animation='slide down' duration={300}>
							<div style={{marginTop: 10 + 'px'}} className="row">
								<ul>
									{metaPathInstances}
								</ul>
							</div>
						</Transition>
					</div>
				</div>
			</div>
		);
	}

}

export default MetaPathDetails;