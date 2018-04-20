import React, { Component} from 'react';

import MetaPath from './MetaPath';
import MetaPathRater from './MetaPathRater';
import { Table, Button } from 'semantic-ui-react';

class IndividualRatingInterface extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let tableRows = this.props.metapaths.map((path, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell>
                        <Button icon primary={true}>
                            [{index}]
                        </Button>
                    </Table.Cell>
                    <Table.Cell>
                        <MetaPath path={path.metapath} />
                    </Table.Cell>
                    <Table.Cell>
                        <MetaPathRater id={path.id} defaultRating={path.rating} rating={path.rating} onChange={(e) => this.props.onChange(e, path.id)} />
                    </Table.Cell>
                </Table.Row>
            );
        });
        
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Meta Path</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tableRows}
                    </Table.Body>
                </Table>
            </div>
        );
    }

}

export default IndividualRatingInterface;