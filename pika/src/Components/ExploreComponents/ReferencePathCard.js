import React, {Component} from 'react';

import MetaPath from './MetaPath';
import { Card } from 'semantic-ui-react';

class ReferencePathCard extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Card fluid>
                <Card.Content>
                    <Card.Header>Reference Meta-Paths</Card.Header>
                    <p style={{marginTop: 10 + 'px'}}>
                        The reference paths summarize the previously rated paths by showing the paths with the maximum and minimum ratings.
                        These can be integrated into the rating of the current batch to 'correct' the ratings from the previous batches.<br /><br />
                        <b>Maximal Meta-Path:</b><MetaPath path={this.props.maxPath.metapath}/><br />
                        <b>Minimal Meta-Path:</b><MetaPath path={this.props.minPath.metapath}/>
                    </p>
                </Card.Content>
            </Card>
        );
    }

}

export default ReferencePathCard;
