import AccountActionTypes from './AccountActionTypes'
import AccountDispatcher from './AccountDispatcher'

const Actions = {
  //Account(name, dataset){
    //AccountDispatcher.dispatch({
    //  type: AccountActionTypes.LOGIN,
    //  payload: {'userName': name,
    //            'dataset': dataset}
  //  });
  //},

  login(){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOGIN
    });
  },

  logout(){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.LOGOUT
    });
  },

  updateUsername(userName){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.UPDATE_USERNAME,
      payload: {'userName': userName}
    })
  },

  selectDataset(dataset){
    AccountDispatcher.dispatch({
      type: AccountActionTypes.DATASET_SELECTION,
      payload: {'dataset': dataset}
    })
  }
};

export default Actions;
