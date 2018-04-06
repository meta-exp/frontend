import AccountActions from '../actions/AccountActions';
import ExploreActions from '../actions/ExploreActions';

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
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: content,
        credentials: "include"
    }).then((response) => {
        if (!(response.status === 200)
        ) {
            alert('Could not send data to server.');
        } else {
          AccountActions.receiveLogin();
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
      AccountActions.receiveLogout();
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
      AccountActions.receiveDatasets(json);
    }
  ).catch((error) => {
      alert("fetch error for datasets. Is server running?");
        console.error(error);
    })
    ;
  },
  fetchMetaPaths(){
    fetch('http://localhost:8000/next-meta-paths/5', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then((response) => {return response.json()}).then( (json) => {
      console.log(JSON.stringify(json));
      console.log(JSON.stringify(json.meta_paths));
      ExploreActions.receiveMetaPaths(json);
    }).catch((error) => {
      console.error(error);
    });
  }
}

export default Actions;
