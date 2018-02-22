import React, { Component } from 'react';


class LogoutButton extends Component {


  saveAndLogout() {
    fetch('http://localhost:8000/' + 'logout', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {
      this.props.onLogout();
    }
    ).catch((error) => {
        console.error(error);
        alert("Could not save this session.")
    })
    ;
  }


render() {
        return <button className="btn btn-primary mx-auto"
                style={{background: 'green'}}
                id="show-more-meta-paths-btn"
                onClick={this.saveAndLogout.bind(this)}>
            <span> Save and Logout </span>
        </button>;
}
}

export default LogoutButton;
