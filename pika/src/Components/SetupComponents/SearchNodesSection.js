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

import SetupStore from '../../stores/SetupStore';
import SetupActions from '../../actions/SetupActions';

import MetaPathAPI from '../../utils/MetaPathAPI';

class SearchNodesSection extends Component {

	constructor(){ 
	    super();

	    this.handleQueryChange = this.handleQueryChange.bind(this);
	    this.handleQueryExecution = this.handleQueryExecution.bind(this);
	    this.getCypherQueries = this.getCypherQueries.bind(this);
	 
	    this.state = {
	    	initialCypherQuery: null,
      		cypherQuery: 'RETURN 1'
	    }; 
	}

	componentWillMount(){
		MetaPathAPI.fetchNodeTypes();
	}

	componentDidMount(){
		SetupStore.on("change", this.getCypherQueries);
	}

	componentWillUnmount(){
		SetupStore.removeListener("change", this.getCypherQueries);
	}

	getCypherQueries(){
		this.setState({ 
			cypherQuery: SetupStore.getInitialCypherQuery(),
			initialCypherQuery: SetupStore.getInitialCypherQuery()
		});
	}

	handleQueryExecution(e){
		e.preventDefault(); 
		e.stopPropagation();

		SetupActions.executeQuery(this.state.cypherQuery);
	}
	 
	handleQueryChange(value, change){
		this.setState({ cypherQuery: value });
	} 
	 
	render() { 
	    return ( 
			<div>
				<h3> 
					<span style={{marginRight: 20 + 'px'}}> 
						Search for Nodes 
					</span> 
					<Button onClick={(e) => this.handleQueryExecution(e)} icon primary> 
						<Icon name='search' /> 
						<span style={{marginLeft: 10 + 'px'}}>Search</span> 
					</Button> 
				</h3>
				{this.state.initialCypherQuery != null ? (
					<CypherEditor 
					onValueChange={(value, change) => this.handleQueryChange(value, change)} 
					value={this.state.initialCypherQuery} 
					options={{ 
						mode: "cypher", 
						theme: "cypher",
						lineNumberFormatter: line => line
					}} 
				/> 
				) : (
					<div>Load Cypher Editor ...</div>
				)}
			</div> 
	    ); 
	  } 

}

export default SearchNodesSection;
