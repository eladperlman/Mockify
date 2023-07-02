class SpotifyAPI {
  private clientId = 'abf1619aac4140af984201a04041b454';
  private clientSecret = '166c482fb50b4ef2b642473973de3c05';
  public token: string;

  constructor() {
    this.token = '';
    this._getToken().then((token) => (this.token = token));
  }

  async _getToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      },
      body: 'grant_type=client_credentials',
    });
    const data = await result.json();
    return data.access_token;
  }

  getToken() {
    return this.token;
  }
}

const spotifyAPI = new SpotifyAPI();

export default spotifyAPI;
