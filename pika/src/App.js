import React, { Component } from 'react';
import Menue from './Components/Menue';
import './App.css';

class App extends Component {

	constructor(){
		super();
		this.state = {
			applicationName: 'PikaExp',
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
			</div>
		);
	}
}

export default App;
