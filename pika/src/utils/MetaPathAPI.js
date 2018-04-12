import AccountActions from '../actions/AccountActions';
import ExploreActions from '../actions/ExploreActions';
import ConfigActions from '../actions/ConfigActions';
import ResultActions from '../actions/ResultActions';

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
        if (!(response.status === 200)){
            alert('Could not send data to server.');
        }
        else {
          AccountActions.receiveLogin();
        }
    }).catch((error) => {
        console.error(error);
    });
  },
  logout(){
    fetch(process.env.REACT_APP_API_HOST + 'logout', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {
      AccountActions.receiveLogout();
    }).catch((error) => {
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
    }).catch((error) => {
      alert("fetch error for datasets. Is server running?");
        console.error(error);
    })
    ;
  },
  fetchMetaPaths(batchSize){
    fetch(process.env.REACT_APP_API_HOST + 'next-meta-paths/' + batchSize.toString(), {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then((response) => {return response.json();}).then( (json) => {
      ExploreActions.receiveMetaPaths(json.meta_paths,json.next_batch_available,json.min_path,json.max_path);
    }).catch((error) => {
      console.error(error);
    });
  }
    ,
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
    sendRatedMetaPaths(ratedMetaPaths, minPath, maxPath){
        fetch(process.env.REACT_APP_API_HOST + 'rate-meta-paths', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                meta_paths: ratedMetaPaths,
                min_path: minPath,
                max_path: maxPath
            }),
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
  },
  saveNewDataset(url, name, username, password){
    alert("URL: " + url + "\nName: " + name + "\nUsername: " + username + "\nPassword: " + password);
    fetch(process.env.REACT_APP_API_HOST + 'save-new-dataset', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        name: name,
        username: username,
        password: password
      }),
      credentials: 'include'
    }).then((response) => { return response.json(); }).then((json) => {
      if (!(json.status === 200)){
        alert('Could not save new dataset');
      }
      else {
        alert('Saved dataset');
        AccountActions.loadDatasets();
      }
    }).catch((error) => {
        console.error(error);
    });
  },
  fetchSimilarityScore(){
    fetch(process.env.REACT_APP_API_HOST + 'get-similarity-score', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json();}).then((json) => {
      ResultActions.receiveSimilarityScore(json.similarity_score);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchFirstNodeSetQuery(){
    fetch(process.env.REACT_APP_API_HOST + 'first-node -set-query', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json();}).then((json) => {
      ResultActions.receiveFirstNodeSetQuery(json.node_set_query);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchSecondNodeSetQuery(){
    fetch(process.env.REACT_APP_API_HOST + 'second-node-set-query', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json();}).then((json) => {
      ResultActions.receiveSecondNodeSetQuery(json.node_set_query);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchContributingMetaPaths(){
    fetch(process.env.REACT_APP_API_HOST + 'contributing-meta-paths', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json();}).then((json) => {
      ResultActions.receiveContributingMetaPaths(json.contributing_meta_paths);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchMetaPathDetails(metaPathId){
    fetch(process.env.REACT_APP_API_HOST + 'contributing-meta-path/' + metaPathId, {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json();}).then((json) => {
      ResultActions.receiveMetaPathDetails(json.meta_path);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchSimilarNodes(){
    fetch(process.env.REACT_APP_API_HOST + 'similar-nodes', {
        method: 'GET',
        credentials: "include"
    }).then((response) => {return response.json();}).then((json) => {
      ResultActions.receiveSimilarNodes(json.similar_nodes);
    }).catch((error) => {
      console.error(error);
    });
  }
}

export default Actions;
