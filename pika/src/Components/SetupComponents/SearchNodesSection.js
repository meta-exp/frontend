import React, { Component } from 'react';

import { Cypher } from "../../../node_modules/graph-app-kit/components/Cypher";
import { DriverProvider } from "../../../node_modules/graph-app-kit/components/DriverProvider";
import { Render } from "../../../node_modules/graph-app-kit/components/Render";
import { Chart } from "../../../node_modules/graph-app-kit/components/Chart";
import { CypherEditor } from "../../../node_modules/graph-app-kit/components/Editor";

import "../../../node_modules/codemirror/lib/codemirror.css";
import "../../../node_modules/codemirror/addon/lint/lint.css";
import "../../../node_modules/codemirror/addon/hint/show-hint.css";
import "../../../node_modules/cypher-codemirror/dist/cypher-codemirror-syntax.css";

import { Button, Icon } from 'semantic-ui-react';


class SearchNodesSection extends Component {

	constructor(){
		super();

		this.state = {
			cypherQuery: "MATCH(n)\nRETURN n"
		};
	}

	handleClick = e => {
		e.preventDefault();
		e.stopPropagation();

		this.props.onClick(this.state.cypherQuery);
	}

	handleChange = (value, change) => {
		this.setState({cypherQuery: value});
	}

	render() {
		return (
			<div>
				<h2>
					<span style={{marginRight: 20 + 'px'}}>
						Search for Nodes
					</span>
					<Button onClick={this.handleClick} icon primary>
						<Icon name='search' />
						<span style={{marginLeft: 10 + 'px'}}>Search</span>
					</Button>
				</h2>
				<CypherEditor id="search-query-editor"
				  	onValueChange={this.handleChange}
					value={this.state.cypherQuery}
					options={{
						mode: "cypher",
						theme: "cypher",
						lineNumberFormatter: line => line
					}}
				/>
			</div>
		);
	}
	
}

export default SearchNodesSection;
