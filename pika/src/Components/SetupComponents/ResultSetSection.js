import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

class ResultSetSection extends Component {

	handleClick = e => {
		e.preventDefault();
		e.stopPropagation();

		alert("mark all buttons. not implemented yet!");
	}

	render() {
		return (
			<div>
				<h3>
					Query Result Set
					<Button onClick={this.handleClick} style={{marginLeft: 20 + 'px'}} icon primary>
						<Icon name='checkmark' />
						<span style={{marginLeft: 10 + 'px'}}>Mark all Nodes</span>
					</Button>
				</h3>
			</div>
		);
	}
	
}

export default ResultSetSection;