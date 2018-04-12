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
      payload: {userName: userName}
    });
  },

  loadDatasets(){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOAD_DATASETS
    });
    MetaPathAPI.getAvailableDatasets();
  },

  selectDataset(dataset_id){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.DATASET_SELECTION,
      payload: {dataset_id: dataset_id}
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
      });
  },

  receiveDatasets(datasets){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOAD_DATASETS_RESPONSE,
      payload: {datasets: datasets}
    });
  },

  updateNewDatasetUrl(url){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.UPDATE_NEW_DATASET_URL,
      payload: {url: url}
    });
  },

  updateNewDatasetUsername(username){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.UPDATE_NEW_DATASET_USERNAME,
      payload: {username: username}
    });
  },

  updateNewDatasetPassword(password){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.UPDATE_NEW_DATASET_PASSWORD,
      payload: {password: password}
    });
  },

  saveNewDataset(url, username, password){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.SAVE_NEW_DATASET
    });
    MetaPathAPI.saveNewDataset(url, username, password);
  }

};

export default Actions;
