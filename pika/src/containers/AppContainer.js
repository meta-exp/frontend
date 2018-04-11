import React, {Component} from 'react';
import {Container} from 'flux/utils';

import AppStore from '../stores/AccountStore';
import App from '../App';

class AppContainer extends Component {
  static getStores() {
    return [AppStore];
  }

  static calculateState(prevState) {
    return {};
  }

  render() {
    return <App />;
  }
}

const container = Container.create(AppContainer);

export default container;