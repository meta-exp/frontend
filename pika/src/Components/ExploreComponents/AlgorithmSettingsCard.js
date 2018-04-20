import React, {Component} from 'react';

import { Card, Checkbox, Form } from 'semantic-ui-react';

class AlgorithmSettingsCard extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        let toggleState = 'On';
        if(!this.props.relativeRatingInterface){
            toggleState = 'Off';
        }

        return(
            <Card fluid>
                <Card.Content>
                    <Card.Header>Algorithm Settings</Card.Header>
                    <Form style={{marginTop: 10 + 'px'}}>
                        <Form.Field>
                            <label>Relative Rating</label>
                            <div className="row">
                                <div className="col">
                                    <Checkbox toggle defaultChecked={this.props.relativeRatingInterface} onClick={(e) => this.props.onClick(e)} />
                                </div>
                                <div className="col">
                                    <b>{toggleState}</b>
                                </div>
                            </div>
                        </Form.Field>
                        <Form.Field>
                            <label>Batchsize</label>
                            <div className="row">
                                <div className="col">
                                    <input type="range" name="batchSize" min={2} max={6} value={this.props.batchSize} onChange={(e) => this.props.onChange(e)} />
                                </div>
                                <div className="col">
                                    <b>Size:</b> {this.props.batchSize}
                                </div>
                            </div>
                        </Form.Field>
                    </Form>
                </Card.Content>
            </Card>
        );
    }

}

export default AlgorithmSettingsCard;