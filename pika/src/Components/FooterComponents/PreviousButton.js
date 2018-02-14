import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

class PreviousButton extends Component {

	handleClick = e => {
		e.preventDefault();
		e.stopPropagation();

		if(this.props.active){
			this.props.onClick(this.props.href);
		}
	}

	render() {
		return (
			<div className="float-left">
				<Button onClick={this.handleClick} icon primary={this.props.active}>
					<Icon name='arrow left' />
					<span style={{marginLeft: 10 + 'px'}}>Previous</span>
				</Button>
			</div>
		);
	}
	
}

export default PreviousButton;