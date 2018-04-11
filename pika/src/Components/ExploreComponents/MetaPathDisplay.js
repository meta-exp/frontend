import React, {Component} from 'react';
import MetaPath from './MetaPath';
import MetaPathID from './MetaPathID';
import MetaPathRater from './MetaPathRater';
import {Table, Checkbox, Card} from 'semantic-ui-react';
import ExploreStore from '../../stores/ExploreStore';
import ExploreActions from '../../actions/ExploreActions';
import Explore from "./Explore";


class MetaPathDisplay extends Component {

    constructor(props) {
        super();

        this.getNewState = this.getNewState.bind(this);

        this.state = {
            loading: true,
            metapaths: [],
            ratedPaths: [],
            batchSize: 5,
            nextBatchAvailable: true,
            timesClicked: 0,
            rangeInterface: true
        };
    }

    componentWillMount() {
        ExploreActions.fetchMetaPaths(this.state.batchSize);
    }

    componentDidMount() {
        ExploreStore.on("change", this.getNewState);
    }

    componentWillUnmount() {
        ExploreStore.removeListener("change", this.getNewState);
    }

    getNewState() {
        this.setState({
            metapaths: ExploreStore.getMetaPaths(),
            ratedPaths: ExploreStore.getRatedMetaPaths(),
            batchSize: ExploreStore.getBatchSize(),
            loading: false,
            rangeInterface: ExploreStore.getInterfaceState()
        });

    }

    handleRatingChange(event, id) {

        ExploreActions.changeRating(id, event.target.value);
    }

    handleBatchSizeChange(event) {
        ExploreActions.changeBatchSize(event.target.value);
    }


    nextRatingIteration() {
        ExploreActions.sendRatedMetaPaths(this.state.metapaths);
        ExploreActions.fetchMetaPaths(this.state.batchSize);
    }

    addClickCount() {
        let clicks = this.state.timesClicked + 1;
        this.setState({timesClicked: clicks});
        this.nextRatingIteration();
    }

    handleInterfaceChange(e) {
        ExploreActions.toggleInterface();
    }

    /*
        Methods for rendering the html
    */

    combinedRatingInterface() {
        return (
            <div>
                {this.state.metapaths.map((path, index) =>
                    <input type="range" multiple min="0" step="0.01" max="1" className={"slider" + index}
                           defaultValue={path.rating}
                           key={index}
                           onClick={(event) => this.handleRatingChange(event, path.id)}/>)
                }
                <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Meta Paths</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.metapaths.map((path, index) =>
                        <Table.Row key={index} className={"slider"+index}>

                            <Table.Cell>
                                <button className={"btn btn-circle text-light slider" + index}>[{path.id}]</button>
                            </Table.Cell>
                            <Table.Cell><MetaPath path={path.metapath}/></Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table></div>);
    }

    individualRatingInterface() {
        return (<div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Meta Path</Table.HeaderCell>
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.metapaths.map((path, index) =>
                        <Table.Row key={index}>
                            <Table.Cell><MetaPathID id={path.id}/></Table.Cell>
                            <Table.Cell><MetaPath path={path.metapath}/></Table.Cell>
                            <Table.Cell><MetaPathRater id={path.id} defaultRating={path.rating} rating={path.rating}
                                                       onChange={this.handleRatingChange.bind(this)}/></Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table></div>);
    }

    render() {
        // Show only text when loading
        if (this.state.loading) {
            return (<div>Fetching new meta-paths...</div>);
        }

        // determine which type of interface should be shown
        let ratingInterface;
        if (this.state.rangeInterface) {
            ratingInterface = this.individualRatingInterface()
        } else {
            ratingInterface = this.combinedRatingInterface()
        }

        // set the button for getting next
        let ratingButton =
            (<button className="btn btn-primary mx-auto"
                                   id="show-more-meta-paths-btn"
                                   onClick={this.nextRatingIteration.bind(this)}>
                <span> Confirm Current Rating & Get Next </span>
            </button>);
        if (!this.state.nextBatchAvailable) {
            ratingButton = <button className="btn btn-primary mx-auto"
                                   id="show-more-meta-paths-btn"
                                   onClick={this.addClickCount.bind(this)}>
                <span> Confirm Current Rating </span>
            </button>;
            if (this.state.timesClicked > 0) {
                ratingButton = <div/>;
            }
        }

        return (
            <div>
                <Card>
                    <Card.Content>
                    <Card.Header>Algorithm Settings</Card.Header>
                    <label>Rating Method </label>
                    Relative <Checkbox toggle defaultChecked={this.state.rangeInterface}
                                       onClick={(e) => this.handleInterfaceChange(e)}/> Individual
                    <br/>
                    <label htmlFor="batchSize">Batchsize</label> 1 <input type="range" name="batchSize" min={1} max={6} value={this.state.batchSize}
                                                                          onChange={this.handleBatchSizeChange.bind(this)}/> 6
                    </Card.Content>
                </Card>

                <h3 align='left' className="font-weight-bold"> Found Meta Paths </h3>
                {ratingInterface}
                {ratingButton}
                <h3 align='left' className="font-weight-bold"> Rated MetaPaths </h3>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.ratedPaths.map((path, index) =>
                            <Table.Row key={index}>
                                <Table.Cell><MetaPathID id={path.id}/></Table.Cell>
                                <Table.Cell>{path.rating}</Table.Cell>
                            </Table.Row>)}
                    </Table.Body>
                </Table>
            </div>
        )
            ;
    }

}

export default MetaPathDisplay;
