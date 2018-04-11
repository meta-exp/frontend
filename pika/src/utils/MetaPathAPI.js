import AccountActions from '../actions/AccountActions';
import ExploreActions from '../actions/ExploreActions';
import ConfigActions from '../actions/ConfigActions';

const Actions = {

  login(userName,dataset) {
    var content = JSON.stringify({
      purpose: 'deprecated',
      username: userName,
      dataset: dataset
    });

    fetch(process.env.REACT_APP_API_HOST + 'login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: content,
      credentials: 'include'
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
    fetch(process.env.REACT_APP_API_HOST + '/next-meta-paths/5', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then((response) => {return response.json();}).then( (json) => {
      ExploreActions.receiveMetaPaths(json.meta_paths);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchNodeTypes(){
    fetch(process.env.REACT_APP_API_HOST + '/get-node-types', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json();}).then((json) => {
      ConfigActions.receiveNodeTypes(json);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchEdgeTypes(){
    fetch(process.env.REACT_APP_API_HOST + 'get-edge-types', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json();}).then((json) => {
      ConfigActions.receiveEdgeTypes(json);
    }).catch((error) => {
      console.error(error);
    });
  },
  sendNodeTypes(nodeTypes){
    fetch(process.env.REACT_APP_API_HOST + 'set-node-types', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nodeTypes),
      credentials: "include"
    }).then((response) => {
      if (!(response.status === 200)) {
        alert('Could not send node types to server.');
      }
    }).catch((error) => {
        console.error(error);
    });
  },
  sendEdgeTypes(edgeTypes){
    fetch(process.env.REACT_APP_API_HOST + 'set-edge-types', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(edgeTypes),
      credentials: "include"
    }).then((response) => {
      if (!(response.status === 200)) {
        alert('Could not send edge types to server.');
      }
    }).catch((error) => {
        console.error(error);
    });
  }
}

export default Actions;
