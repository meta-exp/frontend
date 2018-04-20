import React, {Component} from 'react';
import MetaPath from './MetaPath';
import MetaPathID from './MetaPathID';
import MetaPathRater from './MetaPathRater';
import {Table, Checkbox, Card} from 'semantic-ui-react';
import ExploreStore from '../../stores/ExploreStore';
import ExploreActions from '../../actions/ExploreActions';
import Explore from "./Explore";
import { Button, Icon } from 'semantic-ui-react';
import MetaPathAPI from '../../utils/MetaPathAPI';

class MetaPathDisplay extends Component {

    constructor(props) {
        super();

        this.getNewState = this.getNewState.bind(this);
        this.stopRating = this.stopRating.bind(this);

        this.state = {
            loading: true,
            metapaths: [],
            batchSize: 5,
            nextBatchAvailable: true,
            timesClicked: 0,
            rangeInterface: true,
            maxPath: null,
            minPath: null,
            stepsize: null
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
            batchSize: ExploreStore.getBatchSize(),
            loading: false,
            maxPath: ExploreStore.getMaxPath(),
            minPath: ExploreStore.getMinPath(),
            rangeInterface: ExploreStore.getInterfaceState(),
            stepsize: ExploreStore.getStepsize()
        });

    }

    handleRatingChange(event, id) {
        ExploreActions.changeRating(id, event.target.value);
    }

    handleMaxPathRatingChange(event) {
        ExploreActions.changeMaxPathRating(event.target.value);
    }

    handleMinPathRatingChange(event) {
        ExploreActions.changeMinPathRating(event.target.value);
    }

    handleBatchSizeChange(event) {
        ExploreActions.changeBatchSize(event.target.value);
    }


    nextRatingIteration() {
        this.setState({loading: true});
        ExploreActions.sendRatedMetaPaths(this.state.metapaths, this.state.minPath, this.state.maxPath);
    }

    addClickCount() {
        let clicks = this.state.timesClicked + 1;
        this.setState({timesClicked: clicks});
        this.nextRatingIteration();
    }

    handleInterfaceChange(e) {
        ExploreActions.toggleInterface();
    }

    combinedRatingInterface() {

        let minSlider = <div></div>;
        let maxSlider = <div></div>;
        let referencePathDisplay= <div></div>;

        if('rating' in this.state.minPath && 'metapath' in this.state.minPath){
            minSlider = <input type="range" multiple min="0" step={this.state.stepsize} max="1" className="minSlider"
                   value={this.state.minPath.rating}
                   onChange={(event) => this.handleMinPathRatingChange(event)}/>;
            maxSlider = <input type="range" multiple min="0" step={this.state.stepsize} max="1" className="maxSlider"
            value={this.state.maxPath.rating}
            onChange={(event) => this.handleMaxPathRatingChange(event)}/>;
            referencePathDisplay = <Card>
                <Card.Content>
                    <Card.Header>Reference Meta-Paths</Card.Header>
                    The reference paths summarize the previously rated paths by showing the paths with the maximum and minimum ratings.
                    These can be integrated into the rating of the current batch to 'correct' the ratings from the previous batches.
                    Maximal Meta-Path: <MetaPath path={this.state.maxPath.metapath}/>
                    Minimal Meta-Path: <MetaPath path={this.state.minPath.metapath}/>
                </Card.Content>
            </Card>;
        }


        return (
            <div>
                {referencePathDisplay}
                {this.state.metapaths.map((path, index) =>
                    <input type="range" multiple min="0" step="0.01" max="1" className={"slider" + index}
                           value={path.rating}
                           key={index}
                           onChange={(event) => this.handleRatingChange(event, path.id)}/>)
                }
                {minSlider}
                {maxSlider}
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

    stopRating(e){
        e.preventDefault();
        e.stopPropagation();

        MetaPathAPI.stopRating();
    }

    render() {
        if (this.state.loading) {
            return (<div>Fetching new meta-paths...</div>);
        }

        let ratingInterface;
        if (this.state.rangeInterface) {
            ratingInterface = this.individualRatingInterface()
        } else {
            ratingInterface = this.combinedRatingInterface()
        }

        let ratingButton =
            (<Button icon primary={true} onClick={(e) => this.nextRatingIteration.bind(this)}>
                <Icon name='arrow right' />
                <span style={{marginLeft: 10 + 'px'}}>Confirm Rating & Get Next</span>
            </Button>);
        if (!this.state.nextBatchAvailable) {
            ratingButton = 
                (<Button icon primary={true} onClick={(e) => this.addClickCount.bind(this)}>
                    <Icon name='save' />
                    <span style={{marginLeft: 10 + 'px'}}>Confirm Rating & Finish</span>
                </Button>);
            if (this.state.timesClicked > 0) {
                ratingButton = <div></div>;
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
                    <label htmlFor="batchSize">Batchsize</label> 2 <input type="range" name="batchSize" min={2} max={6} value={this.state.batchSize}
                                                                          onChange={this.handleBatchSizeChange.bind(this)}/> 6
                    </Card.Content>
                </Card>
                <h3 align='left' className="font-weight-bold"> Found Meta Paths </h3>
                {ratingInterface}
                <div className="row" style={{marginTop: 20 + 'px'}}>
                    <div className="col">
                        {ratingButton}
                    </div>
                    <div className="col">
                        <Button floated='right' icon primary={true} onClick={(e) => this.stopRating(e)}>
                            <Icon name='stop' />
                            <span style={{marginLeft: 10 + 'px'}}>Stop Rating</span>
                        </Button>
                    </div>
                </div>
            </div>
        )
            ;
    }

}

export default MetaPathDisplay;
