import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';
import Imprint from '../ImprintComponents/Imprint';

import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';
import AccountStore from '../../stores/AccountStore';

export default class TopMenuBar extends Component {

	constructor(){
		super();

		this.getActivePage = this.getActivePage.bind(this);
		this.getLoggedIn = this.getLoggedIn.bind(this);
		this.handleItemClick = this.handleItemClick.bind(this);

		this.menuPoints = [
			{
				title: 'MetaExp',
				href: '#'
			},
			{
				title: 'Setup',
				href: 'home.html'
			},
			{
				title: 'Config',
				href: 'config.html'
			},
			{
				title: 'Explore',
				href: 'feedback.html',
			},
			{
				title: 'Results',
				href: 'results.html'
			}
		];

		this.state = {
			activeItem: 'Setup',
			loggedIn: false
		};
	}

	componentWillMount(){
		AppStore.on("change", this.getActivePage);
		AccountStore.on("change", this.getLoggedIn);
	}

	componentWillUnmount(){
		AppStore.removeListener("change", this.getActivePage);
		AccountStore.removeListener("change", this.getLoggedIn);
	}

	getActivePage(){
		this.setState({ activeItem: AppStore.getActivePage() });
	}

	getLoggedIn(){
		this.setState({ loggedIn: AccountStore.getLoggedIn() });
	}

	handleItemClick(e, data){
		e.preventDefault();
		e.stopPropagation();
		
		if(this.state.loggedIn){
			AppActions.changePage(data.name);
		}
	}

	render() {

		const activeItem = this.state.activeItem;

		let menuItems;

        if(this.menuPoints){
            menuItems = this.menuPoints.map((item, index) => {
                return (
                    <Menu.Item key={index} name={item.title} active={activeItem === item.title} onClick={(e, data) => this.handleItemClick(e, data)} />
                );
            });
        }

		return (
			<div>
				<Menu pointing={true} inverted={true} stackable={true}>
					<Menu.Menu position='left'>
						{menuItems}
						<Imprint />
					</Menu.Menu>
				</Menu>
			</div>
		);

	}

}
