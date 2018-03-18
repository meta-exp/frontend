import React from 'react';

import LoginView from './LoginView'

function AppView(props) {
    if(!props.account.loggedIn){
      return (<div><LoginView {...props} /></div>);
    } else {
      return (<div>
                hello, {props.account.userName}
                <br />
                <LogoutView {...props} />
              </div>);
    }
}

function LogoutView(props){
  return <button className="btn btn-primary mx-auto"
          style={{background: 'green'}}
          id="show-more-meta-paths-btn"
          onClick={() => props.onLogout()}>
      <span> Save and Logout </span>
  </button>;
}

export default AppView;
