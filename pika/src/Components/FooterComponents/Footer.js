import React, { Component } from 'react';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';

class Footer extends Component {

	handlePageSwap = pageHref => {
		this.props.onClick(pageHref);
	}

	render() {
		return (
			<div  className="footer row" style={{marginTop: 20 + 'px'}}>
				<div className="col">
					<PreviousButton onClick={this.handlePageSwap} href={this.props.prevHref} active={this.props.prevActive} />
				</div>
				<div className="col">
					<NextButton onClick={this.handlePageSwap} href={this.props.nextHref} active={this.props.nextActive} />
				</div>
			</div>
		);
	}
	
}

export default Footer;