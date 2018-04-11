import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';

class Footer extends Component {

	constructor(){
		super();

		this.handlePageChange = this.handlePageChange.bind(this);
		this.getButtonStates = this.getButtonStates.bind(this);
		this.getPages = this.getPages.bind(this);

		this.state = {
			pages: [],
			prevActive: false,
			nextActive: true
		};
	}

	componentWillMount(){
		AppStore.on("change", this.getPages);
		AppStore.on("change", this.getButtonStates);
	}

	componentWillUnmount(){
		AppStore.removeListener("change", this.getPages);
		AppStore.removeListener("change", this.getButtonStates);
	}

	getPages(){
		this.setState({ pages: AppStore.getPages()});
	}

	getButtonStates(){
		this.setState({ 
			prevActive: AppStore.getPrevActive(),
			nextActive: AppStore.getNextActive()
		});
	}

	handlePageChange(nextPage){
		if(nextPage){
			if(this.state.nextActive){
				AppActions.changePage(AppStore.getNextPage());
			}
		}
		else{
			if(this.state.prevActive){
				AppActions.changePage(AppStore.getPrevPage());
			}
		}
	}

	render() {
		return (
			<div  className="footer row" style={{marginTop: 20 + 'px'}}>
				<div className="col">
					<div className="float-left">
						<Button onClick={(e) => this.handlePageChange(false)} icon primary={this.state.prevActive}>
							<Icon name='arrow left' />
							<span style={{marginLeft: 10 + 'px'}}>Previous</span>
						</Button>
					</div>
				</div>
				<div className="col">
					<div className="float-right">
						<Button onClick={(e) => this.handlePageChange(true)} icon primary={this.state.nextActive}>
							<span style={{marginRight: 10 + 'px'}}>Next</span>
							<Icon name='arrow right' />
						</Button>
					</div>
				</div>
			</div>
		);
	}
	
}

export default Footer;