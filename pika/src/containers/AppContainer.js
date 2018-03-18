import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import AccountStore from '../data/AccountStore';
import AccountActions from '../data/AccountActions';
import MetaPathRateBatchStore from '../data/MetaPathRateBatchStore';
import MetaPathRateBatchActions from '../data/MetaPathRateBatchActions';


function getStores(){
  return  [
    AccountStore,
    MetaPathRateBatchStore
  ];
}

function getState(){
  return {
    account: AccountStore.getState(),
    metaPathRateBatch: MetaPathRateBatchStore.getState(),

    loadDatasets: AccountActions.loadDatasets,

    onUpdateUsername: AccountActions.updateUsername,
    onLogin: AccountActions.login,
    onLogout: AccountActions.logout,
    onDatasetSelection: AccountActions.selectDataset,
    onBatchSave: MetaPathRateBatchActions.batchSave,
    onNextBatch: MetaPathRateBatchActions.getNext
  };
}

export default Container.createFunctional(AppView,getStores,getState);
