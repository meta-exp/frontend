import React, { Component } from 'react';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';

class Footer extends Component {

	render() {
		return (
			<div className="footer row" style={{marginTop: 20 + 'px'}}>
				<PreviousButton href={this.props.prevHref} active={this.props.prevActive} />
				<NextButton href={this.props.nextHref} active={this.props.nextActive} />
			</div>
		);
	}
	
}

export default Footer;