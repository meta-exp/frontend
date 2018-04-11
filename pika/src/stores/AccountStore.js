import { EventEmitter } from "events";
import AccountActionTypes from '../actions/AccountActionTypes';
import AccountDispatcher from '../dispatchers/AccountDispatcher';

class AccountStore extends EventEmitter {

  constructor(){
    super();

    this.loggedIn = false;
    this.userName = '';
    this.dataset = '';
    this.availableDatasets = [];
    this.isLoading = true;
  }

  loading(){
    return this.isLoading;
  }

  getAvailableDatasets(){
    return this.availableDatasets;
  }

  getDataset(){
    return this.dataset;
  }

  getUserName(){
    return this.userName;
  }

  getLoggedIn(){
    return this.loggedIn;
  }

  logIn(){
    this.loggedIn = true;
    this.emit("change");
  }

  logOut(){
    this.loggedIn = false;
    this.emit("change");
  }

  setDataset(dataset){
    this.dataset = dataset;
    this.emit("change");
  }

  setUsername(userName){
    this.userName = userName;
    this.emit("change");
  }

  setAvailableDatasets(availableDatasets){
    this.availableDatasets = availableDatasets;
    this.dataset = availableDatasets[0];
    this.isLoading = false;

    this.emit("change");
  }

  handleActions(action){
    switch(action.type){
      case AccountActionTypes.LOGIN_RESPONSE:{
        this.logIn();
        return this.loggedIn;
      };
      case AccountActionTypes.LOGOUT_RESPONSE:{
        this.logOut();
        return this.loggedIn;
      };
      case AccountActionTypes.DATASET_SELECTION:{
        this.setDataset(action.payload.dataset);
        return this.dataset;
      };
      case AccountActionTypes.LOAD_DATASETS_RESPONSE:{
        this.setAvailableDatasets(action.payload.datasets);
        return this.availableDatasets;
      };
      case AccountActionTypes.UPDATE_USERNAME: {
        this.setUsername(action.payload.userName);
        return this.userName;
      };
      default:{
        return this.state;
      };
    }

  }

}

const accountStore = new AccountStore;
accountStore.dispatchToken = AccountDispatcher.register(accountStore.handleActions.bind(accountStore));

export default accountStore;
