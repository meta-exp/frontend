import React, {Component} from 'react';
import MetaPath from './MetaPath';
import MetaPathRater from './MetaPathRater';
import {Table, Checkbox, Card} from 'semantic-ui-react';
import ExploreStore from '../../stores/ExploreStore';
import ExploreActions from '../../actions/ExploreActions';
import Explore from "./Explore";
import { Button, Icon, Dimmer, Loader } from 'semantic-ui-react';
import MetaPathAPI from '../../utils/MetaPathAPI';
import ReferencePathCard from './ReferencePathCard';
import AlgorithmSettingsCard from './AlgorithmSettingsCard';
import IndividualRatingInterface from './IndividualRatingInterface';
import RatingButton from './RatingButton';

class MetaPathDisplay extends Component {

    constructor(props) {
        super();

        this.getNewState = this.getNewState.bind(this);
        this.stopRating = this.stopRating.bind(this);
        this.nextRatingIteration = this.nextRatingIteration.bind(this);
        this.setRatingCompleted = this.setRatingCompleted.bind(this);

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
            computeSimilarity: ExploreStore.isComputingSimilarity(),
            nextBatchAvailable: ExploreStore.getNextBatchAvailable(),
            ratingCompleted: false
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
        return(
            <IndividualRatingInterface metapaths={this.state.metapaths} onChange={(e, id) => this.handleRatingChange.bind(this)} />
        );
    }

    stopRating(e){
        e.preventDefault();
        e.stopPropagation();

        ExploreActions.updateComputeSimilarity(true);
        MetaPathAPI.stopRating();
    }

    getRatingInterface(){
        let ratingInterface = null;
        if (!this.state.relativeRatingInterface) {
            ratingInterface = this.individualRatingInterface();
        } else {
            ratingInterface = this.combinedRatingInterface();
        }

        return ratingInterface;
    }

    getRatingButton(){
        if(this.state.ratingCompleted){
            return(
                <div></div>
            );
        }

        if(this.state.nextBatchAvailable){
            return(
                <RatingButton onClick={(e) => this.nextRatingIteration()} icon='arrow right' btnText='Confirm Rating & Get Next' />
            );
        }
        else{
            return(
                <RatingButton onClick={(e) => this.setRatingCompleted()} icon='save' btnText='Confirm Rating & Finish' />
            );
        }
    }

    nextRatingIteration() {
        this.setState({loading: true});
        ExploreActions.sendRatedMetaPaths(this.state.metapaths, this.state.minPath, this.state.maxPath);
    }
    
    setRatingCompleted(){
        this.setState({ ratingCompleted: true });
        this.nextRatingIteration();
    }

    getReferencePathDisplay(){
        let referencePathDisplay = <div></div>;
        if('rating' in this.state.minPath && 'metapath' in this.state.minPath && this.state.relativeRatingInterface){
            referencePathDisplay = <ReferencePathCard maxPath={this.state.maxPath} minPath={this.state.minPath} /> 
        }

        return referencePathDisplay;
    }

    render() {
        if (this.state.loading) {
            return (
                <Dimmer active inverted>
                    <Loader inverted content='Fetching new meta-paths...' />
                </Dimmer>
            );
        }

        let ratingInterface = this.getRatingInterface();
        let ratingButton = this.getRatingButton();
        let referencePathDisplay= this.getReferencePathDisplay();

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
