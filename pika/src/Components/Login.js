import React, { Component } from 'react';

import { Button, Icon, Dropdown, Form, Input } from 'semantic-ui-react';

import AccountStore from '../stores/AccountStore';
import AccountActions from '../actions/AccountActions';
import MetaPathAPI from '../utils/MetaPathAPI';

class Login extends Component {

  constructor(props) {
      super();

      this.getDatasets = this.getDatasets.bind(this);
      this.getUserName = this.getUserName.bind(this);
      this.submitNaming = this.submitNaming.bind(this);
      this.handleDatasetChange = this.handleDatasetChange.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.renderNaming = this.renderNaming.bind(this);

      this.state = {
        is_loading: true,
        available_datasets: [],
        user_name: "",
        similarity_type: "deprecated",
        dataset: ""
      };
  }

  componentDidMount(){
    MetaPathAPI.getAvailableDatasets();
    AccountStore.on("change", this.getDatasets);
    AccountStore.on("change", this.getUserName);
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

  handleDatasetChange(data){
    AccountActions.selectDataset(this.state.available_datasets[data.value]);
  }

  handleUsernameChange(data){
    AccountActions.updateUsername(data.value);
  }

  submitNaming() {
    AccountActions.login(this.state.user_name, this.state.dataset.name);
  }

  renderNaming() {
    let available_datasets = this.state.available_datasets.map((dataset, index) => {
      return { key: index, value: index, text: dataset.name };
    });

    return (
      <Form>
        <Form.Field>
          <label htmlFor="uname">Your Name</label>
          <Input type="text" placeholder="Some Username" onChange={(e, data) => this.handleUsernameChange(data)} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="dataset">Dataset</label>
          <Dropdown id="dataset" placeholder='Example Dataset' search selection options={available_datasets} onChange={(e, data) => this.handleDatasetChange(data)} />
        </Form.Field>
        <Form.Field>
            <Button onClick={(e) => this.submitNaming()} icon primary={true}>
              <Icon name='sign out' />
              <span style={{marginLeft: 10 + 'px'}}>Sign In</span>
            </Button>
        </Form.Field>
      </Form>
    );
  }

  render() {
    if (this.state.is_loading === true) {
      return (<div> Loading... </div>);
    }
    return this.renderNaming();
  }

}

export default Login;
