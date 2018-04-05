import React, {Component} from 'react';
import {Container} from 'flux/utils';
import AccountStore from '../data/AccountStore';
import AccountActions from '../data/AccountActions';
import App from '../App';

class AppContainer extends Component {
  static getStores() {
    return [
      AccountStore
    ];
  }

  static calculateState(prevState) {
    return {
      account: AccountStore.getState(),
      loadDatasets: AccountActions.loadDatasets,
      onUpdateUsername: AccountActions.updateUsername,
      onLogin: AccountActions.login,
      onLogout: AccountActions.logout,
      onDatasetSelection: AccountActions.selectDataset
    };
  }

  render() {
    return <App />;
  }
}

const container = Container.create(AppContainer);

export default container;