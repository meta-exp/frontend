import React from 'react';

import LoginView from './LoginView'

function AppView(props) {
    if(!props.account.loggedIn){
      return (<div><LoginView {...props} /></div>);
    } else {
      return (<div>hello, {props.account.userName }</div>);
    }


}

export default AppView;
