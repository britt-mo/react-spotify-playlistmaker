const clientID = 'fec769fa1c7342e980c99f44d3aa56e2';
const redirectURI = 'http://localhost:3000/';
let userAccessToken = '';

const Spotify = {
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }

        const url = window.location.href;

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
          userAccessToken = accessTokenMatch[1];
          const expiresIn = Number(expiresInMatch[1]);
          window.setTimeout(() =>(userAccessToken = ''), expiresIn * 1000);
          window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
          return userAccessToken;
          } else {
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          window.location = accessUrl;
        }
      },


    search(term) {
        const accessToken = Spotify.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        return fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => response.json())
        .then(jsonResponse => {
          if(!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.items.map(currTrack => {
            return {
              id: currTrack.id,
              name: currTrack.name,
              artist: currTrack.artists[0].name,
              album: currTrack.album.name,
              uri: currTrack.uri
            };
          })
        });
      },

      savePlaylist(playlistName, trackURIs) {
        if(!playlistName || !trackURIs) {
          return;
        }

        const accessToken = Spotify.getAccessToken();

        return fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.id)
        .then(userID => {
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ name: playlistName}),
            method: 'POST'
          })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistID = jsonResponse.id;
            const addSongsURL = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
            return fetch(addSongsURL, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              body: JSON.stringify({ uris: trackURIs }),
              method: 'POST'
            });
          });
        });
    }
};

export default Spotify;
