import {ReduceStore} from 'flux/utils';
import AccountActionTypes from './AccountActionTypes';
import AccountDispatcher from './AccountDispatcher';

class AccountStore extends ReduceStore {
  constructor(){
    super(AccountDispatcher);
  }

  getInitialState(){
    return {'logged_in': false,
            'userName': 'Testuser',
            'dataset': 'a'};
  }

  reduce(state, action){
    switch(action.type){
      case AccountActionTypes.LOGIN:
        alert('trying to log in');
        return state;

      case AccountActionTypes.UPDATE_USERNAME:
        var newAccount = Object.assign({},state);
        newAccount.userName = action.payload.userName;
        return newAccount;

      case AccountActionTypes.LOGOUT:
        alert('trying to log out');
        return state;
      default:
        return state;
    }

  }

}

export default new AccountStore();
