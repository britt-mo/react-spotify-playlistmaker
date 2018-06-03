import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'New playlist',
      playlistTracks: [
      ],
      searchResults: [
      ],
  };
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
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
   let tracks = this.state.playlistTracks;
   tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
   this.setState({playlistTracks: tracks});
}

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.URI);
    if (trackUris.length > 0) {
      Spotify.savePlayList(this.state.playlistName, trackUris).then(results => {
        this.setState({ searchResults: [], playlistName: 'New Playlist', playlistTracks: [] });
      });
    } else {
      console.log('No tracks to add');
    }
    }


  search(term) {
    if (term !== '') {
      Spotify.search(term).then(results => {
        console.log(results);
        this.setState({ searchResults: results })
      });
    } else {
      this.setState({ searchResults: [] })
    }
  }


  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults ={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName}
      playlistTracks={this.state.playlistTracks}
      onRemove={this.removeTrack}
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
