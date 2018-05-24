import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';
import SearchResults from '../SearchResults/SearchResults.js'

class TrackList extends React.Component {
render() {
  return (
    <div className="TrackList">
    {
        this.props.tracks.map(track =>{
        return <Track track={this.props.track} key={track.id} />
      })
    }
    </div>
    );
    }
  }

export default TrackList;
