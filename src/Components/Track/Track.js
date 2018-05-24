import React from 'react';
import './Track.css';
import SearchResults from '../SearchResults/SearchResults.js'

class Track extends React.Component {
  constructor(props) {
    super(props);
  }
  renderAction(isRemoval) {
    let lineToRender = '';
    if (isRemoval) {
      lineToRender = <a>-</a>;
    }else {
      lineToRender = <a>+</a>;
    }
    return lineToRender;
  }

  render(){
return (
  <div className="Track">
    <div className="Track-information">
      <h3>{this.props.track.name}</h3>
     <p>{this.props.track.artist} | {this.props.track.album}</p>
    </div>
    <a className="Track-action">{this.renderAction()}</a>
  </div>
);
}
}
export default Track;