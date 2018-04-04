import ServerActions from './../data/ServerActions.js'

const Actions = {

  login(userName,dataset) {
    var content = JSON.stringify({
        purpose: 'deprecated',
        username: userName,
        dataset: dataset['name']
      });
      fetch(process.env.REACT_APP_API_HOST + 'login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: content,
        credentials: "include"
    }).then((response) => {
        if (!(response.status === 200)
        ) {
            alert('Could not send data to server.');
        } else {
          ServerActions.receiveLogin();
        }}
    ).catch((error) => {
        console.error(error);
    });
  },
  logout(){
    fetch(process.env.REACT_APP_API_HOST + 'logout', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {
      ServerActions.receiveLogout();
    }
    ).catch((error) => {
        console.error(error);
        alert("Could not save this session.")
    })
    ;
  },
  getAvailableDatasets(){
    fetch(process.env.REACT_APP_API_HOST + 'get-available-datasets', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json()}).then( (json) => {
      ServerActions.receiveDatasets(json);
    }
  ).catch((error) => {
      alert("fetch error for datasets. Is server running?");
        console.error(error);
    })
    ;
  }
}

export default Actions;
