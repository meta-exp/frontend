import React, { Component } from 'react';
import MetaPath from './MetaPath';
import MetaPathID from './MetaPathID';
import MetaPathRater from './MetaPathRater';

class MetaPathDisplay extends Component {

	render() {
		return (
			<table align="center">
				<thead>
				<tr>
					<td>ID</td>
					<td>Path</td>
					<td>Rating</td>
					</tr>
				</thead>
				<tbody>
				<tr>
						<td><MetaPathID/></td>
						<td><MetaPath/></td>
						<td><MetaPathRater/></td>
				</tr>
				<tr>
						<td><MetaPathID/></td>
						<td><MetaPath/></td>
						<td><MetaPathRater/></td>
				</tr>
				</tbody>
			</table>
		);
	}

}

export default MetaPathDisplay;
