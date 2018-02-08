import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

class NextButton extends Component {

	handleClick = e => {
		e.preventDefault();
		e.stopPropagation();

		if(this.props.active){
			this.props.onClick(this.props.href);
		}
	}

	render() {
		return (
			<div className="float-right">
				<Button onClick={this.handleClick} icon primary={this.props.active}>
					<span style={{marginRight: 10 + 'px'}}>Next</span>
					<Icon name='arrow right' />
				</Button>
			</div>
		);
	}

}

export default NextButton;