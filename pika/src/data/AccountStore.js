import {ReduceStore} from 'flux/utils';
import AccountActionTypes from './AccountActionTypes';
import AccountDispatcher from './AccountDispatcher';

class AccountStore extends ReduceStore {
  constructor(){
    super(AccountDispatcher);
  }

  getInitialState(){
    return {'loggedIn': false,
            'userName': 'Testuser',
            'dataset': 'a',
            'available_datasets': []};
  }

  reduce(state, action){
    switch(action.type){
      case AccountActionTypes.LOGIN:
        var newAccount = Object.assign({},state);
        newAccount.loggedIn = true;
        return newAccount;

      case AccountActionTypes.UPDATE_USERNAME:
        var newAccount = Object.assign({},state);
        newAccount.userName = action.payload.userName;
        return newAccount;

      case AccountActionTypes.LOGOUT:
          var newAccount = Object.assign({},state);
          newAccount.loggedIn = false;
          return newAccount;

      case AccountActionTypes.DATASET_SELECTION:
        var newAccount = Object.assign({},state);
        newAccount.dataset = action.payload.dataset;
        return newAccount;

      case AccountActionTypes.LOAD_DATASETS:
        fetch('http://localhost:8000/' + 'get-available-datasets', {
            method: 'GET',
            credentials: "include"
        }).then((response) => {
          return response.json();
        }
      ).then((payload) => {
        AccountDispatcher.dispatch({
          type: AccountActionTypes.DATASET_LOADED,
          payload: payload
      })}).catch((error) => {
          alert("fetch error for datasets. Is server running?");
            console.error(error);
        })
        ;
        return state;

      case AccountActionTypes.DATASET_LOADED:
        var newAccount = Object.assign({},state);
        newAccount.available_datasets = action.payload;
        return newAccount;

      default:
        return state;
    }

  }

}

export default new AccountStore();
