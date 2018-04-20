import React, {Component} from 'react';
import MetaPath from './MetaPath';
import MetaPathID from './MetaPathID';
import MetaPathRater from './MetaPathRater';
import {Table, Checkbox, Card} from 'semantic-ui-react';
import ExploreStore from '../../stores/ExploreStore';
import ExploreActions from '../../actions/ExploreActions';
import Explore from "./Explore";
import { Button, Icon, Dimmer, Loader } from 'semantic-ui-react';
import MetaPathAPI from '../../utils/MetaPathAPI';
import ReferencePathCard from './ReferencePathCard';
import AlgorithmSettingsCard from './AlgorithmSettingsCard';

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
            relativeRatingInterface: true,
            maxPath: null,
            minPath: null,
            stepsize: null,
            computeSimilarity: false
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
            relativeRatingInterface: ExploreStore.getInterfaceState(),
            stepsize: ExploreStore.getStepsize(),
            computeSimilarity: ExploreStore.isComputingSimilarity()
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

        if('rating' in this.state.minPath && 'metapath' in this.state.minPath && this.state.relativeRatingInterface){
                minSlider = <input type="range" multiple min="0" step={this.state.stepsize} max="1" className="minSlider"
                       value={this.state.minPath.rating}
                       onChange={(event) => this.handleMinPathRatingChange(event)}/>;
                maxSlider = <input type="range" multiple min="0" step={this.state.stepsize} max="1" className="maxSlider"
                value={this.state.maxPath.rating}
                onChange={(event) => this.handleMaxPathRatingChange(event)}/>;
        }

        return (
            <div>
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
                </Table>
            </div>
        );
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

        ExploreActions.updateComputeSimilarity(true);
        MetaPathAPI.stopRating();
    }

    render() {
        if (this.state.loading) {
            return (
                <Dimmer active inverted>
                    <Loader inverted content='Fetching new meta-paths...' />
                </Dimmer>
            );
        }

        let ratingInterface;
        if (!this.state.relativeRatingInterface) {
            ratingInterface = this.individualRatingInterface()
        } else {
            ratingInterface = this.combinedRatingInterface()
        }

        let ratingButton =
            (<Button icon primary={true} onClick={this.nextRatingIteration.bind(this)}>
                <Icon name='arrow right' />
                <span style={{marginLeft: 10 + 'px'}}>Confirm Rating & Get Next</span>
            </Button>);
        if (!this.state.nextBatchAvailable) {
            ratingButton = 
                (<Button icon primary={true} onClick={this.addClickCount.bind(this)}>
                    <Icon name='save' />
                    <span style={{marginLeft: 10 + 'px'}}>Confirm Rating & Finish</span>
                </Button>);
            if (this.state.timesClicked > 0) {
                ratingButton = <div></div>;
            }
        }

        let minSlider = <div></div>;
        let maxSlider = <div></div>;
        let referencePathDisplay= <div></div>;

        if('rating' in this.state.minPath && 'metapath' in this.state.minPath){
            referencePathDisplay = <ReferencePathCard maxPath={this.state.maxPath} minPath={this.state.minPath} />
            
        }

        return (
            <div>
                <div className="row">
                    <div className="col-3">
                        <AlgorithmSettingsCard batchSize={this.state.batchSize} relativeRatingInterface={this.state.relativeRatingInterface} onClick={(e) => this.handleInterfaceChange(e)} onChange={this.handleBatchSizeChange.bind(this)} />
                    </div>
                    <div className="col-9">
                        {referencePathDisplay}
                    </div>
                </div>
                <div className="row" className="row" style={{marginTop: 20 + 'px'}}>
                    <Dimmer active={this.state.computeSimilarity} inverted>
                        <Loader inverted content='Started computing similarity indicators. This could take a few minutes...' />
                    </Dimmer>
                    <div className="col">
                        <h3 style={{marginBottom: 20 + 'px'}}>Found Meta-Paths</h3>
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
                </div>
            </div>
        )
            ;
    }

}

export default MetaPathDisplay;
