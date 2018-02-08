import React, { Component } from 'react';

import Nav from './Components/NavComponents/Nav';
import Footer from './Components/FooterComponents/Footer';

import Setup from './Components/SetupComponents/Setup';
import Config from './Components/Config';
import Explore from './Components/Explore';
import Results from './Components/Results';

import './App.css';

class App extends Component {

	constructor(){
		super();

		this.state = {
			applicationName: 'MetaExp',
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
	}

	render() {
		let body;

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
