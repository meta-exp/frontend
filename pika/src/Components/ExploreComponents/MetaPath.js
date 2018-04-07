import React, { Component } from 'react';

class MetaPath extends Component {

  createText(path){
    let htmlPath = Array(path.length);
    for (var i = 0; i < path.length; i++) {
      if (i % 2 === 0) {
        htmlPath[i] = (<b key={i}> {path[i]} </b>);
      } else {
        htmlPath[i] = (<i key={i}> {path[i]} </i>); // TODO: readd the minus in between
      }
    }
    return htmlPath;
  }

	render() {
		return React.createElement('div',[],this.createText(this.props.path));
	}

}

export default MetaPath;
