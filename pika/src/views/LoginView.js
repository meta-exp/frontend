import React, {Component} from 'react';

class  LoginView extends Component {

  constructor(props) {
      super();
    }

    componentDidMount(){
      this.props.loadDatasets();
    }

    render(){

      let available_datasets = this.props.account.available_datasets.map((dataset) => (<option value={dataset.name}>{dataset.name}</option>));


      return (<div>
        <label htmlFor="uname"> Your Name: </label>
        <input type="text"
               id="uname"
               name="userName"
               value={this.props.account.userName}
               onChange={(event) => this.props.onUpdateUsername(event.target.value)}/>
        <br/>
        <br/>
          <label htmlFor="dataset">Choose a dataset: </label>
        <select value={this.props.account.dataset} name='dataset' onChange={(event) => this.props.onDatasetSelection(event.target.value)}>
            {available_datasets}
        </select>
        <div>
            <button onClick={() => this.props.onLogin()}>Create user and log in </button>
        </div>
    </div>);
}}

export default LoginView;
