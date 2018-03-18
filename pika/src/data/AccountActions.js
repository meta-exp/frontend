import AccountActionTypes from './AccountActionTypes'
import AccountDispatcher from './AccountDispatcher'
import MetaPathAPI from './../utils/MetaPathAPI'

const Actions = {

  login(userName, dataset){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOGIN
    });
    MetaPathAPI.login(userName,dataset);
  },

  logout(){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOGOUT
    });
    MetaPathAPI.logout();
  },

  updateUsername(userName){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.UPDATE_USERNAME,
      payload: {'userName': userName}
    })
  },

  loadDatasets(){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOAD_DATASETS
    });
    MetaPathAPI.getAvailableDatasets();
  },

  selectDataset(dataset){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.DATASET_SELECTION,
      payload: {'dataset': dataset}
    })
  }
};

export default Actions;
