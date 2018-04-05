import { EventEmitter } from "events";
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppActionTypes from '../actions/AppActionTypes';

class AppStore extends EventEmitter {

	constructor(){
		super();
		this.activePage = 'Setup';
	}

	getActivePage(){
		return this.activePage;
	}

	setActivePage(name){
		this.activePage = name;
		this.emit("change");
	}

	handleActions(action){
		switch(action.type){
			case AppActionTypes.CHANGE_PAGE: {
				this.setActivePage(action.payload.name);
			}
		}
	}

}

const appStore = new AppStore;
AppDispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;