import {ReduceStore} from 'flux/utils';
import AccountActionTypes from '../actions/AccountActionTypes';
import AccountDispatcher from '../dispatchers/AccountDispatcher';

class AccountStore extends ReduceStore {
  constructor(){
    super(AccountDispatcher);
  }

  getInitialState(){
    return {'loggedIn': false,
            'userName': 'Diving Unicorn',
            'dataset': 'placeholder',
            'available_datasets': []};
  }

  reduce(state, action){
    switch(action.type){
      case AccountActionTypes.LOGIN_RESPONSE:
        var newAccount = Object.assign({},state);
        newAccount.loggedIn = true;
        return newAccount;

      case AccountActionTypes.LOGIN:
        // do nothing, call is sent
        // maybe disable interface?
        return state;

      case AccountActionTypes.LOGOUT_RESPONSE:
        var newAccount = Object.assign({},state);
        newAccount.loggedIn = false;
        return newAccount;

      case AccountActionTypes.LOGOUT:
        return state;

      case AccountActionTypes.DATASET_SELECTION:
        var newAccount = Object.assign({},state);
        newAccount.dataset = action.payload.dataset;
        return newAccount;

      case AccountActionTypes.LOAD_DATASETS:
        // do nothing
        return state;

      case AccountActionTypes.LOAD_DATASETS_RESPONSE:
        var newAccount = Object.assign({},state);
        newAccount.available_datasets = action.payload;
        newAccount.dataset = action.payload[0];
        return newAccount;

      default:
        return state;
    }

  }

}

export default new AccountStore();
