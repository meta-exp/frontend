import React, { Component } from 'react';
import SelectorList from './SelectorList';

class Config extends Component {

  constructor(props){
    super(props);
    this.state = {
      node_types: [['Merkur', true], ['Venus', true], ['Erde', false], ['Mars', true]],
      edge_types: [['ISS', true], ['MIR', false]],
    }
  }

  handleChange(event) {
    alert('Help me, I was clicked :(');
  }

  render() {
    return (
      <div>
        <h1>Config</h1>
        <h2>Welcome, it's so nice to have you here</h2>
        <SelectorList item_names='Gurkenliste' check_note='Dabei oder nicht dabei?' items={this.state.node_types}/>
        <input type="checkbox" class="toggle-button" value={true} onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }

}

export default Config;
