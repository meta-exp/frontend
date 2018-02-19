import React, { Component } from 'react';

import Nav from './Components/NavComponents/Nav';
import Footer from './Components/FooterComponents/Footer';

import Setup from './Components/SetupComponents/Setup';
import Config from './Components/Config';
import Explore from './Components/Explore';
import Results from './Components/Results';
import Imprint from './Components/Imprint';
import Login from './Components/Login';


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
	this.setState({logged_in: true});
}


	render() {
		let body;

		if(this.state.logged_in === false){
			return <Login onLogin={this.handleLogin.bind(this)}/>;
		}

		if(this.state.activePage === 'Setup'){
			body = <Setup />;
		}
		else if(this.state.activePage === 'Config'){
			body = <Config />;
		}
		else if(this.state.activePage === 'Explore'){
			body = <Explore />;
		}
		else if(this.state.activePage === 'Results'){
			body = <Results />;
		}
        else if(this.state.activePage === 'Imprint'){
            body = <Imprint />;
        }

		return (
			<div className="App">
				<Nav onClick={this.handleNavAction} applicationName={this.state.applicationName} navPoints={this.state.navPoints} />
				<div className="content-wrapper">
					<div className="container-fluid">
						{body}
					</div>
					<div className="container-fluid">
						<Footer onClick={this.handleNavAction} prevHref={this.state.prevHref} nextHref={this.state.nextHref} prevActive={this.state.prevActive} nextActive={this.state.nextActive} />
					</div>
				</div>
			</div>
		);
	}

}

export default App;
