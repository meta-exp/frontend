import LoginView from '../views/LoginView';
import {Container} from 'flux/utils';
import AccountStore from '../data/AccountStore';
import AccountActions from '../data/AccountActions';

function getStores(){
  return  [
    AccountStore,
  ];
}

function getState(){
  return {
    account: AccountStore.getState(),

    onUpdateUsername: AccountActions.updateUsername,
    onLogin: AccountActions.login
  };
}

export default Container.createFunctional(LoginView,getStores,getState);
