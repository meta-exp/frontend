import React, {Component} from 'react';

import { Button, Icon } from 'semantic-ui-react';

class RatingButton extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<Button icon primary={true} onClick={(e) => this.props.onClick(e)}>
				<Icon name={this.props.icon} />
				<span style={{marginLeft: 10 + 'px'}}>{this.props.btnText}</span>
			</Button>
		);
	}

}

export default RatingButton;