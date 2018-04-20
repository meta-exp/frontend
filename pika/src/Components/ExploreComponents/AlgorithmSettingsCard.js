import React, {Component} from 'react';

import { Card, Checkbox } from 'semantic-ui-react';

class AlgorithmSettingsCard extends Component {

    constructor(props) {
        super();
    }

    render(){
        return(
            <Card fluid>
                <Card.Content>
                    <Card.Header>Algorithm Settings</Card.Header>
                    <label>Rating Method</label>
                    Relative
                    <Checkbox toggle defaultChecked={this.props.rangeInterface}
                                onClick={(e) => this.onClick(e)}/>
                    Individual
                    <br/>
                    <label htmlFor="batchSize">Batchsize</label>
                    2 <input type="range" name="batchSize" min={2} 
                            max={6} value={this.props.batchSize}
                            onChange={(e) => this.props.onChange(e)}/> 6
                </Card.Content>
            </Card>
        );
    }

}

export default AlgorithmSettingsCard;