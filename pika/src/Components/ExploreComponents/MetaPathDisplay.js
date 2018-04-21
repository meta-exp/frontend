import React, {Component} from 'react';
import MetaPath from './MetaPath';
import MetaPathRater from './MetaPathRater';
import {Table, Checkbox, Card, Button, Icon, Dimmer, Loader } from 'semantic-ui-react';
import ExploreStore from '../../stores/ExploreStore';
import ExploreActions from '../../actions/ExploreActions';
import Explore from "./Explore";
import MetaPathAPI from '../../utils/MetaPathAPI';
import ReferencePathCard from './ReferencePathCard';
import AlgorithmSettingsCard from './AlgorithmSettingsCard';
import IndividualRatingInterface from './IndividualRatingInterface';
import RatingButton from './RatingButton';
import CombinedRatingMetaPathTable from './CombinedRatingMetaPathTable';

class MetaPathDisplay extends Component {

    constructor(props) {
        super();

        this.getNewState = this.getNewState.bind(this);
        this.stopRating = this.stopRating.bind(this);
        this.nextRatingIteration = this.nextRatingIteration.bind(this);
        this.setRatingCompleted = this.setRatingCompleted.bind(this);
        this.addMetaPathToScala = this.addMetaPathToScala.bind(this);

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
            computeSimilarity: false,
            metapathsAddedToScala: []
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

        let el = event.target;
        let width = el.offsetWidth;
        let offset = -1.3;
        let newPlace = 0;

        let newPoint = (el.value - el.getAttribute("min")) / (el.getAttribute("max") - el.getAttribute("min"));
        
        if (newPoint < 0) { newPlace = 0; }
        else if (newPoint > 1) { newPlace = width; }
        else { newPlace = width * newPoint + offset; offset -= newPoint; }
        
        el.nextSibling.style.left = newPlace + "px";
        el.nextSibling.style.marginLeft = offset + "%";
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

    getMinSlider(){
        return(
            <input id="slider-wrapper" type="range" multiple min="0" step={this.state.stepsize} max="1" className="minSlider"
                   value={this.state.minPath.rating} onChange={(event) => this.handleMinPathRatingChange(event)} />
        );
    }

    getMaxSlider(){
        return(
            <input id="slider-wrapper" type="range" multiple min="0" step={this.state.stepsize} max="1" className="maxSlider"
                    value={this.state.maxPath.rating} onChange={(event) => this.handleMaxPathRatingChange(event)} />
        );
    }

    addMetaPathToScala(e, path){
        if(!this.state.metapathsAddedToScala.includes(path)){
            this.setState({ metapathsAddedToScala: this.state.metapathsAddedToScala.concat(path) });
        }
    }

    combinedRatingInterface() {
        let minSlider = <div></div>;
        let maxSlider = <div></div>;

        if('rating' in this.state.minPath && 'metapath' in this.state.minPath && this.state.relativeRatingInterface){
                minSlider = this.getMinSlider();
                maxSlider = this.getMaxSlider();
        }

        let metapathSliders = this.state.metapathsAddedToScala.map((path, index) => {
            let class_name = "";
            if(index > 0){
                class_name = "not-first-range";
            }

            return(
                <div id="slider-wrapper" key={index + "_0"}>
                    <input type="range" multiple min="0" step="0.01" max="1" value={path.rating} key={index + "_1"}
                           onChange={(event) => this.handleRatingChange(event, path.id)} className={class_name} />
                    <output key={index + "_2"}>[{path.id}]</output>
                </div>
            );
        });

        return (
            <div>
                <div id="sliders">
                    {metapathSliders}
                    {minSlider}
                    {maxSlider}
                </div>
                <CombinedRatingMetaPathTable onClick={(e, path) => this.addMetaPathToScala(e, path)} metapaths={this.state.metapaths} />
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
        if(this.state.metapathsAddedToScala.length < this.state.batchSize){
            alert("Please add all meta-paths in batch to the scala and rate them!");
            return false;
        }

        this.setState({
            loading: true,
            metapathsAddedToScala: []
        });
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
                        <h3 style={{marginBottom: 50 + 'px'}}>
                            <Icon name='options' />
                            <span style={{marginLeft: 10 + 'px'}}>
                                Found Meta-Paths
                            </span>
                        </h3>
                        {ratingInterface}
                        <div className="row" style={{marginTop: 20 + 'px'}}>
                            <div className="col">
                                <span style={{marginRight: 10 + 'px'}}>
                                    {ratingButton}
                                </span>
                                <Icon name='repeat' />
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
