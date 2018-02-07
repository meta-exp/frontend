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
			ratedPaths: [],
			nameIsSet: 0,
			userName: "Davide",
			similarityType: "Geolocation"
		};
	}

	handleRatingChange(event, id){
		const metapaths = this.state.metapaths.slice();
		let index = this.state.metapaths.findIndex(x => x.id = id);
		metapaths[index].rating = event.target.value;
		this.setState({metapaths: metapaths});
	}

	makeInteractiveRow(metaPath){
		return (
			<tr>
					<td><MetaPathID id={metaPath.id}/></td>
					<td><MetaPath path={metaPath.path}/></td>
					<td><MetaPathRater id={metaPath.id} defaultRating={metaPath.rating} rating={metaPath.rating} onChange={this.handleRatingChange.bind(this)}/></td>
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
		let newRatedPaths = this.state.metapaths.map(path => {id: path.id, rating: path.rating});
		let ratedPaths = this.state.ratedPaths.slice();
		ratedPaths = ratedPaths.concat(newRatedPaths);
		this.setState({ratedPaths: ratedPaths, metapaths: [this.generateMetaPath(),this.generateMetaPath(),this.generateMetaPath()]});
		console.log(this.getFromBackend('GET', ''));
	}

	savePaths(){
		alert("Not implemented yet.");
	}

	submitNaming(){
		this.setState({
      nameIsSet: 1
    });

	}

	handleInputChange(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

		this.setState({
      [name]: value
    });
	}

	renderWeighting(){
		let tableRows = this.state.metapaths.map((path, index) => this.makeInteractiveRow(path, index));
		let ratedPaths = this.state.ratedPaths.map(path => this.makeRatedRow(path));

		return (
			<div>
			<div>
				<h4> Prurpose: </h4> {this.state.similarityType} <br />
				<h4> by: </h4> {this.state.userName}
			</div>
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
						<td colSpan="3">
							<div class="row">
								<button class="btn btn-primary mx-auto" id="show-more-meta-paths-btn" onClick={()=>this.sendFeedback()}>
									<span>Send feedback</span>
								</button>
								<button class="btn btn-primary mx-auto" id="show-more-meta-paths-btn" onClick={this.savePaths.bind(this)}>
								<span>Save Rating</span>
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

	renderNaming(){
		return (<div>
			<label for="uname">Your Name: </label>
			<input type="text" id="uname" name="userName" value={this.state.userName} onChange={this.handleInputChange.bind(this)}/>
			<br />
			<label for="uname">Describe the type of similarity: </label>
			<input type="text" id="simtype" name="similarityType" value={this.state.similarityType} onChange={this.handleInputChange.bind(this)}/>
			<div>
    			<button onClick={this.submitNaming.bind(this)}>Submit</button>
  		</div>
		</div>);
	}

	render() {
		if(this.state.nameIsSet === 0){
			return this.renderNaming();
		} else {
			return this.renderWeighting();
		}

	}

}

export default MetaPathDisplay;
