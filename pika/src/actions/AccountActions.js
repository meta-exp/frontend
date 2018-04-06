import AccountActionTypes from './AccountActionTypes';
import AccountDispatcher from '../dispatchers/AccountDispatcher';
import MetaPathAPI from '../utils/MetaPathAPI';

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
  },
  
  receiveLogin(response) {
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOGIN_RESPONSE
    });
  },

  receiveLogout(){
      AccountDispatcher.dispatch({
        type: AccountActionTypes.LOGOUT_RESPONSE
      })
  },

  receiveDatasets(response){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOAD_DATASETS_RESPONSE,
      payload: response
  })}
};

export default Actions;
