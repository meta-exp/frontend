import React, { Component } from 'react';
import MetaPath from './MetaPath';
import MetaPathID from './MetaPathID';
import MetaPathRater from './MetaPathRater';

class MetaPathDisplay extends Component {

	generateMetaPath(){
		this.runningId += 1;
		return { id: this.runningId,
			path: ['Phenotype','HAS','Association','HAS','SNP','HAS','Phenotype'],
			rating: 0.5};
	}

	constructor(props){
		super();
		this.runningId = -1;
		this.state = {
			metapaths: [this.generateMetaPath(),this.generateMetaPath(),this.generateMetaPath()],
			ratedPaths: []
		};
	}

	handleRatingChange(event, index){
		const metapaths = this.state.metapaths.slice();
		metapaths[index].rating = event.target.value;
		this.setState({metapaths: metapaths});
	}

	makeInteractiveRow(metaPath,index){
		return (
			<tr>
					<td><MetaPathID id={metaPath.id}/></td>
					<td><MetaPath path={metaPath.path}/></td>
					<td><MetaPathRater id={metaPath.id} index={index} defaultRating={metaPath.rating} rating={metaPath.rating} onChange={this.handleRatingChange.bind(this)}/></td>
			</tr>
		);
	}

	makeRatedRow(metaPath){
		return (
			<tr>
					<td><MetaPathID id={metaPath.id}/></td>
					<td>{metaPath.rating}</td>
			</tr>
		);
	}

	displayCurrentRatings(){
		// recompute tableRows
		// appen rating to table below
	}
	helperrr(path,index){
		return {id: path.id, rating: path.rating};
	}

    getFromBackend(endpoint) {
		let result = '';
        fetch('http://localhost:8000/'+endpoint, {
            method: 'GET'
        }).then((response) => response.json()).then((responseJson) => {
        	console.log(responseJson);
            console.log(responseJson.world);
            result = responseJson.world;
        }).catch((error) => {
            console.error(error);
        });
        return result;
    }

    postToBackend(endpoint, data) {
        fetch('http://localhost:8000/endpoint/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        });
	}

	sendFeedback(){
		let newRatedPaths = this.state.metapaths.map((path, index) => this.helperrr(path,index));
		let ratedPaths = this.state.ratedPaths.slice();
		ratedPaths = ratedPaths.concat(newRatedPaths);
		this.setState({ratedPaths: ratedPaths, metapaths: [this.generateMetaPath(),this.generateMetaPath(),this.generateMetaPath()]});
		// TODO render again?
        console.log(this.getFromBackend('GET', ''));
	}

	render() {
		let tableRows = this.state.metapaths.map((path, index) => this.makeInteractiveRow(path, index));
		let ratedPaths = this.state.ratedPaths.map(path => this.makeRatedRow(path));

		return (
			<div>
			<h3 align='center' className="font-weight-bold">Found Meta Paths</h3>
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
								<button class="btn btn-primary mx-auto" id="show-more-meta-paths-btn" onClick={()=>this.sendFeedback()}>
									<span>Send feedback</span>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<h3 align='center' className="font-weight-bold">Rated Meta Paths</h3>
			<table align="center">
			<thead>
			<tr>
				<td>ID</td>
				<td>Rating</td>
				</tr>
			</thead>
			<tbody>
			{ratedPaths}
			</tbody>
		</table>
			</div>
		);
	}

}

export default MetaPathDisplay;
