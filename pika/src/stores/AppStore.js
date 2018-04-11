import { EventEmitter } from "events";
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppActionTypes from '../actions/AppActionTypes';

class AppStore extends EventEmitter {

	constructor(){
		super();

		this.activePage = 'Setup';
		this.pages = ['Setup', 'Config', 'Explore', 'Results'];
		this.prevActive = false;
		this.nextActive = true;
	}

	getPrevActive(){
		return this.prevActive;
	}

	getNextActive(){
		return this.nextActive;
	}

	getPages(){
		return this.pages;
	}

	getPrevPage(){
		var index = this.pages.indexOf(this.activePage) - 1;
		return this.pages[index];
	}

	getNextPage(){
		var index = this.pages.indexOf(this.activePage) + 1;
		return this.pages[index];
	}

	getActivePage(){
		return this.activePage;
	}

	setActivePage(pageTitle){
		this.activePage = pageTitle;
		this.setFooterNavigationProperties(pageTitle);
		this.emit("change");
	}

	setFooterNavigationProperties(pageTitle){
		if(pageTitle === 'Setup'){
			this.prevActive = false;
			this.nextActive = true;
		}
		else if(pageTitle === 'Config'){
			this.prevActive = true;
			this.nextActive = true;
		}
		else if(pageTitle === 'Explore'){
			this.prevActive = true;
			this.nextActive = true;
		}
		else if(pageTitle === 'Results'){
			this.prevActive = true;
			this.nextActive = false;
		}
	}

	handleActions(action){
		switch(action.type){
			case AppActionTypes.CHANGE_PAGE: {
				this.setActivePage(action.payload.name);
				return this.activePage;
			};
		}
	}

}

const appStore = new AppStore;
AppDispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;