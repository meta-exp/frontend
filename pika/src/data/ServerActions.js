import AccountActionTypes from './AccountActionTypes'
import AccountDispatcher from './AccountDispatcher'

const Actions = {
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
