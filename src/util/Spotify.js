const clientId = 'fec769fa1c7342e980c99f44d3aa56e2';
const redirectUri = 'http://localhost:3000/';
let userAccessToken = '';

const Spotify = {
    search(term) {
        this.getUserAccessToken();
        let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        try {
            let response = fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userAccessToken
                }
            });
            if (response.ok) {
                let jsonResponse = response.json();
                let tracks = jsonResponse.tracks.items.map(track => {
                    return {
                        ID: track.id,
                        artist: track.artists[0].name, Name: track.name, Album: track.album.name, URI: track.uri
                    }
                })
                return tracks;
            }
            throw new Error('Error on retrieving data from Spotify API');
        } catch (error) {
            console.log(error);
        }

    },
    savePlayList(name, tracks) {
        this.getUserAccessToken();
        if (!tracks || name === undefined) {
            return
        }

        try {
            let headers = { 'Authorization': 'Bearer ' + userAccessToken };
            let urlUserInfo = 'https://api.spotify.com/v1/me';
            let response = fetch(urlUserInfo, { headers: headers });

            if (!response.ok) {
                throw new Error('Fail to get user info');
            }

            let userInfo = response.json();

            headers = { ...headers, 'Content-Type': 'application/json' }
            const urlPlaylist = `https://api.spotify.com/v1/users/${userInfo.id}/playlists`;

            response = fetch(
                urlPlaylist,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ name: name })
                }
            );

            if (!response.ok) {
                throw new Error('Fail to create playlist');
            }

            let playlistInfo = response.json();
            let playlistId = playlistInfo.id;
            const urlPlaylistTracks = `https://api.spotify.com/v1/users/${userInfo.id}/playlists/${playlistId}/tracks`;
            response = fetch(
                urlPlaylistTracks,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: tracks })
                });
            if (!response.ok) {
                throw new Error('Fail to add tracks to playlist');
            }
        } catch (error) {
            console.log(error);
        }

    },
    getUserAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }
        else if (window.location.href.match(/access_token=([^&]*)/) != null) {
            userAccessToken = window.location.href.match(/access_token=([^&]*)/)[0].split("=")[1];
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].split("=")[1];
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const authUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            console.log(authUri);
            window.location.href = authUri;
        }
    }
}

export default Spotify;
