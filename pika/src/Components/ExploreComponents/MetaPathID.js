import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

class MetaPathID extends Component {

	render() {
		return (
			<Button icon primary={true}>
                <Icon name='stop' />
                <span style={{marginLeft: 10 + 'px'}}>[{this.props.id}]</span>
            </Button>
		);
	}

}


export default MetaPathID;
