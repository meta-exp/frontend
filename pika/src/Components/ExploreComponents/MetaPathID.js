import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';

class MetaPathID extends Component {

	render() {
		return (
			<Button icon primary={true}>
                [{this.props.id}]
            </Button>
		);
	}

}

export default MetaPathID;
