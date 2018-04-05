import React, { Component } from 'react'

import { Button, Header, Modal, Menu } from 'semantic-ui-react'
import ImprintContent from './ImprintContent';
  
export default class Imprint extends Component {
  
  constructor(){
    super();

    this.state = {
      open: false
    };
  }
  
  close = () => this.setState({ open: false });

  render() {
    return(
      <Modal 
        trigger={<Menu.Item name='Imprint' />} 
        size="fullscreen"
      >
        <Modal.Header>Imprint</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <ImprintContent />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );

  }
  
}
