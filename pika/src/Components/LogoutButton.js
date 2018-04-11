import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import AccountActions from '../actions/AccountActions';

class LogoutButton extends Component {

    constructor(){
        super();

        this.saveAndLogout = this.saveAndLogout.bind(this);
    }

    saveAndLogout() {
        AccountActions.logout();
    }

    render() {
        return(
            <Button onClick={(e) => this.saveAndLogout()} icon primary={true}>
              <Icon name='sign in' />
              <span style={{marginLeft: 10 + 'px'}}>Sign Out</span>
            </Button>
        );
    }
}

export default LogoutButton;
