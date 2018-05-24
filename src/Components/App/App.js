import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import TrackList from '../TrackList/TrackList.js';
import Track from '../Track/Track.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'Song',
        artist: 'Prince',
        album: 'Musicology',
        id: '1'}
      ]
  },
  {
    playlistName: 'Roadtrip'
  },
  {
    playlistTracks: [
      {name: 'Bye Bye Bye',
      artist: 'NSync',
      album: 'No Strings Attached',
      id: '2'}
    ]
  }
}

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar/>
    <div className="App-playlist">
      <SearchResults searchResults ={this.state.searchResults}/>
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
