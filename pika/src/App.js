import React, { Component } from 'react';

import Nav from './Components/NavComponents/Nav';
import Footer from './Components/FooterComponents/Footer';

import Setup from './Components/SetupComponents/Setup';
import Config from './Components/Config';
import Explore from './Components/Explore';
import Results from './Components/Results';
import Imprint from './Components/Imprint';
import Login from './Components/Login';
import LogoutButton from './Components/LogoutButton';


import './App.css';

class App extends Component {

	constructor(){
		super();

		this.state = {
			applicationName: 'MetaExp',
			logged_in: false,
			prevActive: false,
			nextActive: true,
			prevHref: '#',
			nextHref: 'config.html',
			activePage: 'Setup',
			navPoints: [
				{
					title: 'Setup',
					href: 'home.html',
					active: true
				},
				{
					title: 'Config',
					href: 'config.html',
					active: false
				},
				{
					title: 'Explore',
					href: 'feedback.html',
					active: false
				},
				{
					title: 'Results',
					href: 'results.html',
					active: false
				},
                {
                    title: 'Imprint',
                    href: 'imprint.html',
                    active: false
                }
			]
		};

	}

	handleNavAction = pageTitle => {
		if(pageTitle === 'Setup' || pageTitle === 'home.html'){
			this.setState({
				prevActive: false,
				nextActive: true,
				activePage: 'Setup',
				prevHref: '#',
				nextHref: 'config.html'
			});
		}
		else if(pageTitle === 'Config' || pageTitle === 'config.html'){
			this.setState({
				prevActive: true,
				nextActive: true,
				activePage: 'Config',
				prevHref: 'home.html',
				nextHref: 'feedback.html'
			});
		}
		else if(pageTitle === 'Explore' || pageTitle === 'feedback.html'){
			this.setState({
				prevActive: true,
				nextActive: true,
				activePage: 'Explore',
				prevHref: 'config.html',
				nextHref: 'results.html'
			});
		}
		else if(pageTitle === 'Results' || pageTitle === 'results.html'){
			this.setState({
				prevActive: true,
				nextActive: false,
				activePage: 'Results',
				prevHref: 'feedback.html',
				nextHref: '#'
			});
		}
        else if(pageTitle === 'Imprint' || pageTitle === 'imprint.html'){
            this.setState({
                prevActive: false,
                nextActive: false,
                activePage: 'Imprint',
                prevHref: '#',
                nextHref: '#'
            });
        }
	}

handleLogin(loginInfo){
	console.log("Logged in.");
	this.setState({logged_in: true, userName: loginInfo.userName, dataset: loginInfo.dataset, similarityType: loginInfo.similarityType});
}

handleLogout(){
	console.log("Logged out.");
	this.setState({logged_in: false, prevActive: false, nextActive: true, activePage: 'Setup', prevHref: '#', nextHref: 'config.html'});
}


	render() {
		let body;

		if(this.state.logged_in === false){
			body = <Login onLogin={this.handleLogin.bind(this)}/>;
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
										dataset={this.state.dataset}/>;
			}
			else if(this.state.activePage === 'Results'){
				body = <Results />;
			}
	        else if(this.state.activePage === 'Imprint'){
	            body = <Imprint />;
	        }
		}

		return (
			<div className="App">
				<Nav onClick={this.handleNavAction} applicationName={this.state.applicationName} navPoints={this.state.navPoints} />
				<div>
				<div>
						<h4> Purpose: </h4> {this.state.similarityType} <br/>
						<h4> Dataset: </h4> {this.state.dataset} <br/>
						<h4> Created by: </h4> {this.state.userName}
				</div>
				</div>
				<div className="content-wrapper">
					<div className="container-fluid">
						{body}
					</div>

					<div className="container-fluid">
						<Footer onClick={this.handleNavAction} prevHref={this.state.prevHref} nextHref={this.state.nextHref} prevActive={this.state.prevActive} nextActive={this.state.nextActive} />
					</div>
					<div align="center">
					<LogoutButton onLogout={this.handleLogout.bind(this)}/>
					</div>
				</div>
			</div>
		);
	}

}

export default App;
