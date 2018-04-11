import React, { Component } from 'react';

import TopMenuBar from './Components/NavComponents/Menu';
import Footer from './Components/FooterComponents/Footer';
import Setup from './Components/SetupComponents/Setup';
import Config from './Components/ConfigComponents/Config';
import Explore from './Components/ExploreComponents/Explore';
import Results from './Components/ResultComponents/Results';
import Login from './Components/Login';
import LogoutButton from './Components/LogoutButton';

import AppStore from './stores/AppStore';
import AccountStore from './stores/AccountStore';

import './App.css';

class App extends Component {

	constructor(){
		super();

		this.getActivePage = this.getActivePage.bind(this);
		this.getLoggedIn = this.getLoggedIn.bind(this);

		this.state = {
			logged_in: false,
			activePage: 'Setup'
		};
	}

	componentDidMount(){
		AppStore.on("change", this.getActivePage);
		AccountStore.on("change", this.getLoggedIn);
	}

	componentWillUnmount(){
		AppStore.removeListener("change", this.getActivePage);
		AccountStore.removeListener("change", this.getLoggedIn);
	}

	getActivePage(){
		this.setState({ activePage: AppStore.getActivePage() });
	}

	getLoggedIn(){
		this.setState({ logged_in: AccountStore.getLoggedIn() });
	}

	render() {
		let body;

		if(this.state.logged_in === false){
			body = <Login />;
		}
		else{
			if(this.state.activePage === 'Setup'){
				body = <Setup />;
			}
			else if(this.state.activePage === 'Config'){
				body = <Config />;
			}
			else if(this.state.activePage === 'Explore'){
				body = <Explore
							userName={this.state.userName}
							similarityType={this.state.similarityType}
							dataset={this.state.dataset} />;
			}
			else if(this.state.activePage === 'Results'){
				body = <Results />;
			}
		}

		return (
			<div className="App">
				<TopMenuBar />
				<div className="content-wrapper">
					<div className="container-fluid">
						{body}
					</div>
					<div className="container-fluid">
						{this.state.logged_in ? (<Footer />) : (<div></div>)}
					</div>
					<div align="center">
						{this.state.logged_in ? (<LogoutButton />) : (<div></div>)}
					</div>
				</div>
			</div>
		);
	}

}

export default App;
