import React, { Component } from 'react';


class Login extends Component {

  constructor(props) {
      super();
      this.state = {
        isLoading: true,
        available_datasets: [],
    		userName: "Davide",
    		similarityType: "Geolocation",
    		dataset: "huhu"
      };
  }

  componentDidMount(){
    this.getJsonFromBackend('get-available-datasets',this.setAvailableDatasets.bind(this));
  }

  getJsonFromBackend(endpoint, callback) {
      fetch(process.env.REACT_APP_API_HOST + endpoint, {
          method: 'GET',
          credentials: "include"
      }).then((response) => {
        console.log(response);
        return response.json();
      }
      ).then(callback).catch((error) => {
          console.error(error);
      })
      ;
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

setAvailableDatasets(data){
  this.setState({
      isLoading: false,
      available_datasets: data,
      dataset: data[0].name
  });
}

handleLoginSuccess(){
  this.postJsonToBackend('login',{
        purpose: this.state.similarityType,
        username: this.state.userName,
        dataset: this.state.dataset
      },
    ()=>{});
  this.props.onLogin({
    similarityType: this.state.similarityType,
    userName: this.state.userName,
    dataset: this.state.dataset});
}

submitNaming() {
    this.getJsonFromBackend('login',this.handleLoginSuccess.bind(this));
}

render() {
  if (this.state.isLoading === true) {
    return (<div> Loading... </div>);
  }
  return this.renderNaming();
}


renderNaming() {
  let available_datasets = this.state.available_datasets.map((dataset, index) => (<option key={index} value={dataset.name}>{dataset.name}</option>));

  return (
    <div>
      <label htmlFor="uname"> Your Name: </label>
      <input type="text"
             id="uname"
             name="userName"
             value={this.state.userName}
             onChange={this.handleInputChange.bind(this)}/>
      <br/>
      <label htmlFor="simtype"> Describe the type of similarity: </label>
      <input type="text"
             id="simtype"
             name="similarityType"
             value={this.state.similarityType}
             onChange={this.handleInputChange.bind(this)}/>
      <br />
        <label htmlFor="dataset">Choose a dataset: </label>
      <select value={this.state.dataset} name='dataset' onChange={this.handleInputChange.bind(this)}>
          {available_datasets}
      </select>
      <div>
          <button onClick={this.submitNaming.bind(this)}>Submit</button>
      </div>
    </div>
  );
}

}
export default Login;
