import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'Song',
        artist: 'Prince',
        album: 'Musicology',
        id: '1'}
      ],

    playlistName: [
      {name: 'Roadtrip'}
    ],

    playlistTracks: [
      {name: 'Bye Bye Bye',
      artist: 'NSync',
      album: 'No Strings Attached',
      id: '2'}
    ]
  };
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
}

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  return;
} else {
     let tracks = this.state.playlistTracks;
     tracks.push(track);
     this.setState({playlistTracks: tracks});
   }
  }

  removeTrack(track) {
  this.setState({
    playlistTracks: this.state.playlistTracks.filter(playlistTrack => {
      return playlistTrack.id !== track.id;
    })
  });
}


  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar/>
    <div className="App-playlist">
      <SearchResults searchResults ={this.state.searchResults}
      onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName}
      playlistTracks={this.state.playlistTracks}
      onRemove={this.removeTrack()}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
