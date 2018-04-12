import React, { Component } from 'react';

import { Button, Icon, Dropdown, Form, Input, Transition } from 'semantic-ui-react';

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
      this.toggleDatasetField = this.toggleDatasetField.bind(this);
      this.saveDataset = this.saveDataset.bind(this);
      this.changeNewDatasetUrl = this.changeNewDatasetUrl.bind(this);
      this.changeNewDatasetUsername = this.changeNewDatasetUsername.bind(this);
      this.changeNewDatasetPassword = this.changeNewDatasetPassword.bind(this);
      this.getNewDatasetProperties = this.getNewDatasetProperties.bind(this);

      this.state = {
        is_loading: true,
        available_datasets: [],
        user_name: "",
        similarity_type: "deprecated",
        dataset: {},
        show_dataset_form: false,
        dataset_btn_icon: 'add',
        dataset_btn_text: 'Add Dataset',
        submit_btn_margin: '20px',
        new_dataset_url: '',
        new_dataset_username: '',
        new_dataset_password: ''
      };
  }

  componentDidMount(){
    MetaPathAPI.getAvailableDatasets();
    AccountStore.on("change", this.getDatasets);
    AccountStore.on("change", this.getUserName);
    AccountStore.on("change", this.getNewDatasetProperties);
  }

  componentWillUnmount(){
    AccountStore.removeListener("change", this.getDatasets);
    AccountStore.removeListener("change", this.getUserName);
    AccountStore.removeListener("change", this.getNewDatasetProperties);
  }

  getNewDatasetProperties(){
    this.setState({
      new_dataset_url: AccountStore.getNewDatasetUrl(),
      new_dataset_username: AccountStore.getNewDatasetUsername(),
      new_dataset_password: AccountStore.getNewDatasetPassword()
    });
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
    AccountActions.selectDataset(data.value);
  }

  handleUsernameChange(data){
    AccountActions.updateUsername(data.value);
  }

  changeNewDatasetUrl(data){
    AccountActions.updateNewDatasetUrl(data.value);
  }

  changeNewDatasetUsername(data){
    AccountActions.updateNewDatasetUsername(data.value);
  }

  changeNewDatasetPassword(data){
    AccountActions.updateNewDatasetPassword(data.value);
  }

  toggleDatasetField(e){
    e.preventDefault();
    e.stopPropagation();

    if(!this.state.show_dataset_form){
      this.setState({
        show_dataset_form: true,
        dataset_btn_icon: 'remove',
        dataset_btn_text: 'Remove Dataset',
        submit_btn_margin: '0px'
      });
    }
    else{
      this.setState({
        show_dataset_form: false,
        dataset_btn_icon: 'add',
        dataset_btn_text: 'Add Dataset',
        submit_btn_margin: '20px'
      });
    }
  }

  saveDataset(){
    alert('Dataset saved!');
  }

  submitNaming(e) {
    e.preventDefault();
    e.stopPropagation();

    AccountActions.login(this.state.user_name, this.state.dataset.name);
  }

  renderNaming() {
    let available_datasets = this.state.available_datasets.map((dataset, index) => {
      return { key: index, value: index, text: dataset.name };
    });
    //alert("URL: " + this.state.new_dataset_url + "\n" + "User: " + this.state.new_dataset_username + "\n" + "Password: " + this.state.new_dataset_password);
    return (
      <Form>
        <Form.Field>
          <label htmlFor="uname">Your Name</label>
          <Input type="text" placeholder="Some Username" onChange={(e, data) => this.handleUsernameChange(data)} />
        </Form.Field>
        <div className="row" style={{marginTop: 20 + 'px'}}>
          <div className="col-10">
            <Form.Field>
              <label htmlFor="dataset">Dataset</label>
              <Dropdown id="dataset" placeholder='Example Dataset' search selection options={available_datasets} onChange={(e, data) => this.handleDatasetChange(data)} />
            </Form.Field>
          </div>
          <div className="col-2">
            <Form.Button floated='right' onClick={(e) => this.toggleDatasetField(e)} icon primary={false} style={{marginTop: 23 + 'px'}}>
              <Icon name={this.state.dataset_btn_icon} />
              <span style={{marginLeft: 10 + 'px'}}>{this.state.dataset_btn_text}</span>
            </Form.Button>
          </div>
        </div>
        <Transition visible={this.state.show_dataset_form} animation='slide down' duration={200}>
          <Form.Field>
            <div className="row" style={{marginTop: 20 + 'px'}}>
              <div className="col-10">
                <Form.Group widths='equal'>
                  <Form.Input onChange={(e, data) => this.changeNewDatasetUrl(data)} fluid label='URL' placeholder='URL to Database' value={this.state.new_dataset_url} />
                  <Form.Input onChange={(e, data) => this.changeNewDatasetUsername(data)} fluid label='Username' placeholder='Username of Database' value={this.state.new_dataset_username} />
                  <Form.Input onChange={(e, data) => this.changeNewDatasetPassword(data)} fluid label='Password' placeholder='Password of Database' type='password' value={this.state.new_dataset_password} />
                </Form.Group>
              </div>
              <div className="col-2">
                <Form.Button onClick={(e) => this.saveDataset(e)} floated='right' icon primary={true} style={{marginTop: 23 + 'px'}}>
                  <Icon name='save' />
                  <span style={{marginLeft: 10 + 'px'}}>Save</span>
                </Form.Button>
              </div>
            </div>
          </Form.Field>
        </Transition>
        <Form.Field style={{marginTop: this.state.submit_btn_margin}}>
          <Form.Button onClick={(e) => this.submitNaming(e)} icon primary={true}>
            <Icon name='sign out' />
            <span style={{marginLeft: 10 + 'px'}}>Sign In</span>
          </Form.Button>
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
