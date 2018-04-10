import React, { Component } from 'react';

import AccountStore from '../stores/AccountStore';
import AccountActions from '../actions/AccountActions';

class Login extends Component {

  constructor(props) {
      super();

      this.getDatasets = this.getDatasets.bind(this);
      this.getUserName = this.getUserName.bind(this);
      this.submitNaming = this.submitNaming.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);

      this.state = {
        is_loading: true,
        available_datasets: [],
        user_name: "Davide",
        similarity_type: "Geolocation",
        dataset: "huhu"
      };
  }

  componentWillMount(){
    AccountStore.on("change", this.getDatasets);
    AccountStore.on("change", this.getUserName);
  }

  componentDidMount(){
    AccountActions.loadDatasets();
  }

  componentWillUnmount(){
    AccountStore.removeListener("change", this.getDatasets);
    AccountStore.removeListener("change", this.getUserName);
  }

  getDatasets(){
    this.setState({
      dataset: AccountStore.getDataset(),
      available_datasets: AccountStore.getAvailableDatasets(),
      is_loading: AccountStore.loading()
    });
  }

  getUserName(){
    this.setState({ user_name: AccountStore.getUserName() });
  }

  postJsonToBackend(endpoint, data, callback) {
      fetch(process.env.REACT_APP_API_HOST + endpoint, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: "include"
      }).then((response) => {
          if (!(response.status === 200)
          ) {
              alert('Could not send data to server.');
          } else {
            callback();
          }
      }).catch((error) => {
          console.error(error);
      })
      ;
  }

handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
}

submitNaming() {
  this.postJsonToBackend('login',{
    purpose: this.state.similarity_type,
    username: this.state.user_name,
    dataset: this.state.dataset
  },()=>{});

  this.props.onLogin({
    similarityType: this.state.similarity_type,
    userName: this.state.user_name,
    dataset: this.state.dataset
  });
}

render() {
  if (this.state.is_loading === true) {
    return (<div> Loading... </div>);
  }
  return this.renderNaming();
}


renderNaming() {
  let available_datasets = this.state.available_datasets.map((dataset, index) => {
    <option key={index} value={dataset.name}>{dataset.name}</option>
  });

  return (
    <div>
      <label htmlFor="uname"> Your Name: </label>
      <input type="text"
             id="uname"
             name="user_name"
             value={this.state.user_name}
             onChange={this.handleInputChange()}/>
      <br/>
      <label htmlFor="simtype"> Describe the type of similarity: </label>
      <input type="text"
             id="simtype"
             name="similarity_type"
             value={this.state.similarity_type}
             onChange={this.handleInputChange()}/>
      <br />
        <label htmlFor="dataset">Choose a dataset: </label>
      <select value={this.state.dataset} name='dataset' onChange={this.handleInputChange()}>
          {available_datasets}
      </select>
      <div>
          <button onClick={(e) => this.submitNaming()}>Submit</button>
      </div>
    </div>
  );
}

}
export default Login;
