import React, {Component} from 'react';
import MetaPath from './MetaPath';
import MetaPathID from './MetaPathID';
import MetaPathRater from './MetaPathRater';

class MetaPathDisplay extends Component {

    /*
        UI state handling
    */

    defaultState  = {
        metapaths: [],
        ratedPaths: [],
        nextBatchAvailable: true,
        timesClicked: 0
    };

    constructor(props) {
        super();
        this.state = this.defaultState;
    }

    handleRatingChange(event, id) {
        const metapaths = this.state.metapaths.slice();
        let index = this.state.metapaths.findIndex(x => x.id === id);
        metapaths[index].rating = event.target.value;
        this.setState({metapaths: metapaths});
    }

    //TODO onmount make first request

    /*
        Backend Interaction
    */

    getNextMetaPathBatch() {
        this.getJsonFromBackend('next-meta-paths/5', this.addNewMetaPathsToDisplay.bind(this));
    }

    addNewMetaPathsToDisplay(jsonResponse) {
      this.setState({nextBatchAvailable: jsonResponse.next_batch_available});
      let metapaths = jsonResponse.meta_paths;
      let oldMetaPaths = this.state.metapaths.slice();
      oldMetaPaths = oldMetaPaths.concat(metapaths);
      this.setState({metapaths: oldMetaPaths});
    }

    getJsonFromBackend(endpoint, callback) {
        fetch('http://localhost:8000/' + endpoint, {
            method: 'GET',
            credentials: "include"
        }).then((response) => {
          console.log(response);
          return response.json();
        }
        ).then(callback).catch((error) => {
            console.error(error);
        })
        ;
    }

postJsonToBackend(endpoint, data, callback) {
        fetch('http://localhost:8000/' + endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        }).then((response) => {
            if (!(response.status === 200)
            ) {
                console.log(response);
                console.log(response.json());
                alert('Could not send data to server.');
            } else {
              callback();
            }
        }).catch((error) => {
            console.error(error);
        })
        ;
    }

    nextRatingIteration() {
        let newRatedPaths = this.state.metapaths.map(path => path);
        let ratedPaths = this.state.ratedPaths.slice();
        ratedPaths = ratedPaths.concat(newRatedPaths);
        this.setState({ratedPaths: ratedPaths, metapaths: []});
        this.getNextMetaPathBatch();
        this.postJsonToBackend('rate-meta-paths', newRatedPaths);
    }

    addClickCount(){
      let clicks = this.state.timesClicked + 1;
      this.setState({timesClicked: clicks});
      this.nextRatingIteration();
    }

    /*
        Methods for rendering the html
    */

    render() {
        let tableRows = this.state.metapaths.map((path, index) => this.renderMetaPathRatingRow(path, index));
        let ratedPaths = this.state.ratedPaths.map(path => this.renderRatedMetaPathRow(path));

        let ratingButton = <button className="btn btn-primary mx-auto"
                id="show-more-meta-paths-btn"
                onClick={this.nextRatingIteration.bind(this)}>
            <span> Confirm Current Rating & Get Next </span>
        </button>;
        if(!this.state.nextBatchAvailable){
          ratingButton = <button className="btn btn-primary mx-auto"
                  id="show-more-meta-paths-btn"
                  onClick={this.addClickCount.bind(this)}>
              <span> Confirm Current Rating </span>
          </button>;
          if(this.state.timesClicked > 0){
            ratingButton = <div />;
          }
        }

        return (
            <div>
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
                                {ratingButton}
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
        let available_datasets = this.state.available_datasets.map((dataset) => (<option value={dataset.name}>{dataset.name}</option>));

        return (<div>
            <label htmlFor="uname"> Your Name: </label>
            <input type="text"
                   id="uname"
                   name="userName"
                   value={this.props.userName}
                   onChange={this.handleInputChange.bind(this)}/>
            <br/>
            <label htmlFor="simtype"> Describe the type of similarity: </label>
            <input type="text"
                   id="simtype"
                   name="similarityType"
                   value={this.props.similarityType}
                   onChange={this.handleInputChange.bind(this)}/>
            <br />
              <label htmlFor="dataset">Choose a dataset: </label>
            <select value={this.props.dataset} name='dataset' onChange={this.handleInputChange.bind(this)}>
                {available_datasets}
            </select>
            <div>
                <button onClick={this.submitNaming.bind(this)}>Submit</button>
            </div>
        </div>);
    }


    renderMetaPathRatingRow(metaPath) {
        return (
            <tr>
                <td><MetaPathID id={metaPath.id}/></td>
                <td><MetaPath path={metaPath.metapath}/></td>
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
