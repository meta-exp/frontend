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
            'dataset': 'a'};
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

      default:
        return state;
    }

  }

}

export default new AccountStore();
