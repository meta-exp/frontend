import React, { Component } from 'react';
import Menue from './Components/Menue';
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
			menuePoints: [
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
				<Menue applicationName={this.state.applicationName} menuePoints={this.state.menuePoints} />
				<Footer prevHref={this.state.prevHref} nextHref={this.state.nextHref} prevActive={this.state.prevActive} nextActive={this.state.nextActive} />
			</div>
		);
	}

}

export default App;