import React, {Component} from 'react';
import MetaPath from './MetaPath';
import MetaPathID from './MetaPathID';
import MetaPathRater from './MetaPathRater';

class MetaPathDisplay extends Component {

    /*
        UI state handling
    */

    constructor(props) {
        super();
        this.state = {
            metapaths: [],
            ratedPaths: [],
            nameIsSet: 0,
            userName: "Davide",
            similarityType: "Geolocation"
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRatingChange(event, id) {
        const metapaths = this.state.metapaths.slice();
        let index = this.state.metapaths.findIndex(x => x.id === id);
        metapaths[index].rating = event.target.value;
        this.setState({metapaths: metapaths});
    }

    /*
        Backend Interaction
    */

    saveAllMetaPaths() {
        alert("Not implemented yet.");
    }

    getNextMetaPathBatch() {
        this.getJsonFromBackend('next-meta-paths', this.addNewMetaPathsToDisplay.bind(this));
    }

    addNewMetaPathsToDisplay(metapaths) {
        let oldMetaPaths = this.state.metapaths.slice();
        oldMetaPaths = oldMetaPaths.concat(metapaths);
        this.setState({metapaths: oldMetaPaths});
    }

    getJsonFromBackend(endpoint, callback) {
        fetch('http://localhost:8000/' + endpoint, {
            method: 'GET'
        }).then((response) => response.json()
        ).then(callback).catch((error) => {
            console.error(error);
        })
        ;
    }

    postJsonToBackend(endpoint, data) {
        fetch('http://localhost:8000/' + endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        }).then((response) => {
            if (!(response.status === 200)
            ) {
                alert('Could not send data to server.');
                console.log(data);
            }
        }).catch((error) => {
            console.error(error);
        })
        ;
    }

    nextRatingIteration() {
        let newRatedPaths = this.state.metapaths.map(path => ({id: path.id, rating: path.rating}));
        let ratedPaths = this.state.ratedPaths.slice();
        ratedPaths = ratedPaths.concat(newRatedPaths);
        this.setState({ratedPaths: ratedPaths, metapaths: []});
        this.getNextMetaPathBatch();
        this.postJsonToBackend('rate-meta-paths', newRatedPaths);
    }


    submitNaming() {
        this.postJsonToBackend('submit-name', {purpose: this.state.submitNaming, name: this.state.userName});
        this.setState({
            nameIsSet: 1
        });
    }

    /*
        Methods for rendering the html
    */

    render() {
        if (this.state.nameIsSet === 0) {
            return this.renderNaming();
        } else {
            return this.renderWeighting();
        }

    }

    renderWeighting() {
        let tableRows = this.state.metapaths.map((path, index) => this.renderMetaPathRatingRow(path, index));
        let ratedPaths = this.state.ratedPaths.map(path => this.renderRatedMetaPathRow(path));

        return (
            <div>
                <div>
                    <h4> Purpose: </h4> {this.state.similarityType} <br/>
                    <h4> Created by: </h4> {this.state.userName}
                </div>
                <h3 align='center' className="font-weight-bold"> Found Meta Paths </h3>
                <table align="center">
                    <thead>
                    <tr>
                        <td> ID</td>
                        <td> Path</td>
                        <td> Rating</td>
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows}
                    <tr>
                        <td colSpan="3">
                            <div className="row">
                                <button className="btn btn-primary mx-auto"
                                        id="show-more-meta-paths-btn"
                                        onClick={this.nextRatingIteration.bind(this)}>
                                    <span> Confirm Current Rating & Get Next </span>
                                </button>
                                <button className="btn btn-primary mx-auto"
                                        id="show-more-meta-paths-btn"
                                        onClick={this.saveAllMetaPaths.bind(this)}>
                                    <span> Save Rating </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3 align='center'
                    className="font-weight-bold"> Rated Meta Paths </h3>
                <table align="center">
                    <thead>
                    <tr>
                        <td> ID</td>
                        <td> Rating</td>
                    </tr>
                    </thead>
                    <tbody>
                    {ratedPaths}
                    </tbody>
                </table>
            </div>
        )
            ;
    }

    renderNaming() {
        return (<div>
            <label htmlFor="uname"> Your Name: </label>
            <input type="text"
                   id="uname"
                   name="userName"
                   value={this.state.userName}
                   onChange={this.handleInputChange.bind(this)}/>
            <br/>
            <label htmlFor="uname"> Describe the type of similarity: </label>
            <input type="text"
                   id="simtype"
                   name="similarityType"
                   value={this.state.similarityType}
                   onChange={this.handleInputChange.bind(this)}/>
            <div>
                <button onClick={this.submitNaming.bind(this)}>Submit</button>
            </div>
        </div>);
    }


    renderMetaPathRatingRow(metaPath) {
        return (
            <tr key={metaPath.id}>
                <td><MetaPathID id={metaPath.id}/></td>
                <td><MetaPath path={metaPath.path}/></td>
                <td>< MetaPathRater id={metaPath.id} defaultRating={metaPath.rating} rating={metaPath.rating}
                                    onChange={this.handleRatingChange.bind(this)}/></td>
            </tr>
        );
    }

    renderRatedMetaPathRow(metaPath) {
        return (
            <tr>
                <td>< MetaPathID id={metaPath.id}/></td>
                <td> {metaPath.rating}</td>
            </tr>
        );
    }

}

export default MetaPathDisplay;
