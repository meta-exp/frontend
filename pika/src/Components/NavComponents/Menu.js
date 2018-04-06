import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';
import AccountDropDown from './AccountDropDown';
import Imprint from '../ImprintComponents/Imprint';

import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';

export default class TopMenuBar extends Component {

	constructor(){
		super();

		this.getActivePage = this.getActivePage.bind(this);

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

		this.state = {activeItem: AppStore.getActivePage()};
	}

	componentWillMount(){
		AppStore.on("change", this.getActivePage);
	}

	componentWillUnmount(){
		AppStore.removeListener("change", this.getActivePage);
	}

	getActivePage(){
		this.setState({ activeItem: AppStore.getActivePage() });
	}

	getAccountActionItem() {
		if(this.props.loggedIn){
			return(
				<AccountDropDown />
			);
		}
		else{
			return(
				<Menu.Item name='Login' active={this.state.activeItem === 'Login'} />
			);
		}
	}

	handleItemClick = (e, { name }) => {
		e.preventDefault();
		e.stopPropagation();
		
		AppActions.changePage(name);
	}

	render() {

		const activeItem = this.state.activeItem;

		let menuItems;

        if(this.menuPoints){
            menuItems = this.menuPoints.map((item, index) => {
                return (
                    <Menu.Item key={index} name={item.title} active={activeItem === item.title} onClick={this.handleItemClick} />
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
					<Menu.Menu position='right'>
						{this.getAccountActionItem()}
					</Menu.Menu>
				</Menu>
			</div>
		);

	}

}
