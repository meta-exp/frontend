import React, { Component } from 'react';
import MetaPath from './MetaPath';
import MetaPathID from './MetaPathID';
import MetaPathRater from './MetaPathRater';

class MetaPathDisplay extends Component {

	constructor(props){
		super();
		this.state = {
			metapaths: [
				{ id: '1',
					path: ['Phenotype','HAS','Association','HAS','SNP','HAS','Phenotype']},
				{ id: '2',
					path: ['Phenotype','HAS','Association','HAS','SNP','HAS','Phenotype']},
				{ id: '3',
					path: ['Phenotype','HAS','Association','HAS','SNP','HAS','Phenotype']}
			]
		};
	}

	makeComponent(metaPath){
		console.log(metaPath);
		return (
			<tr>
					<td><MetaPathID id={metaPath.id}/></td>
					<td><MetaPath path={metaPath.path}/></td>
					<td><MetaPathRater/></td>
			</tr>
		);
	}

	render() {
		let tableRows = this.state.metapaths.map(path => this.makeComponent(path))

		return (
			<div>
			<table align="center">
				<thead>
				<tr>
					<td>ID</td>
					<td>Path</td>
					<td>Rating</td>
					</tr>
				</thead>
				<tbody>
				{tableRows}
				<tr>
						<td colspan="3">
							<div class="row">
								<button class="btn btn-primary mx-auto" id="show-more-meta-paths-btn">
									<span>Send feedback</span>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			</div>
		);
	}

}

export default MetaPathDisplay;
