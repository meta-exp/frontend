import React, { Component } from 'react';

import { Table, Button, Icon } from 'semantic-ui-react';
import MetaPath from './MetaPath';
import MetaPathRater from './MetaPathRater';

class CombinedRatingMetaPathTable extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let tableRows = this.props.metapaths.map((path, index) => {
            return(
                <Table.Row key={index} className={"slider"+index}>
                    <Table.Cell>
                        <Button className={'slider' + index} onClick={(e) => this.props.onClick(e, path)} icon primary={true}>
                            [{path.id}]
                        </Button>
                    </Table.Cell>
                    <Table.Cell><MetaPath path={path.metapath}/></Table.Cell>
                </Table.Row>
            );
        });

        return(
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Meta Paths</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tableRows}
                </Table.Body>
            </Table>
        );
    }

}

export default CombinedRatingMetaPathTable;