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

class SearchNodesSection extends Component {

	render() {
		return (
			<div>
				<h2>Search for Nodes</h2>
				<CypherEditor
				  value=":head"
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
