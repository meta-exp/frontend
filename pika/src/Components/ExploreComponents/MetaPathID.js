import React, { Component } from 'react';

class MetaPathID extends Component {

	render() {
		return (
      <button style={{background: 'blue'}} className="btn btn-circle text-light chose-meta-path-btn">[{this.props.id}]</button>
		);
	}

}


export default MetaPathID;
