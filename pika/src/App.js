import React, { Component } from 'react';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
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

	render() {
		return (
			<div className="App">
				<Nav applicationName={this.state.applicationName} navPoints={this.state.navPoints} />
				<Footer prevHref={this.state.prevHref} nextHref={this.state.nextHref} prevActive={this.state.prevActive} nextActive={this.state.nextActive} />
			</div>
		);
	}

}

export default App;