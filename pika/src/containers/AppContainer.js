import AppView from '../views/AppView';
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
    onLogin: AccountActions.login,
    onDatasetSelection: AccountActions.selectDataset
  };
}

export default Container.createFunctional(AppView,getStores,getState);
