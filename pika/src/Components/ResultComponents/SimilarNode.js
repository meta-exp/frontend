import React, { Component } from 'react';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class SimilarNode extends Component {

	constructor(props){
		super(props);

		this.constructDivId = this.constructDivId.bind(this);
	}

	constructDivId(){
		return this.props.rowId + "-" + this.props.colId;
	}

	formPropString(propObject){
        let propText = "";
        for (let key in propObject) {
            if(propObject.hasOwnProperty(key)) {
                propText += key + ': ' + propObject[key] + ", ";
            }
        }
        return propText;
    }

	render(){
		let nodeProps = Object.getOwnPropertyNames(this.props.similarNode.properties).map((key, index) => {
			return(
				<li key={index}><b>{key}:</b> {this.props.similarNode.properties[key]}</li>
			);
		});
        
		return(
			<div className="row">
				<div className="col" style={{marginRight: 10 + 'px'}}>
					<h5>1-Neighborhood</h5>
					<Neo4jGraphRenderer divId={this.constructDivId()} url={this.props.dataset.url} user={this.props.dataset.username} password={this.props.dataset.password} query={this.props.similarNode.cypher_query} />
				</div>
				<div className="col" style={{marginLeft: 10 + 'px'}}>
					<h5>Properties</h5>
					<ul>
						{nodeProps}
					</ul>
				</div>
			</div>
		);
	}

}

export default SimilarNode;
