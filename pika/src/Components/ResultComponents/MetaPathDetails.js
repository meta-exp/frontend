import React, { Component } from 'react';

import { Button, Icon, Progress } from 'semantic-ui-react';

class MetaPathDetails extends Component {

	constructor(){
		super();
	}

	render(){
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
					</div>
				</div>
			</div>
		);
	}

}

export default MetaPathDetails;