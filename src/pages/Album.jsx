import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      favoritesSongs: [],
    };
    this.musicsRequest = this.musicsRequest.bind(this);
    this.handlerChecked = this.handlerChecked.bind(this);
    this.favoriteSongRequest = this.favoriteSongRequest.bind(this);
    this.isFvorites = this.isFvorites.bind(this);
  }

  componentDidMount() {
    this.musicsRequest();
    this.favoriteSongRequest();
  }

  async handlerChecked(musics) {
    await addSong(musics);
  }

  async musicsRequest() {
    const { match } = this.props;
    const { id } = match.params;
    const requestFromApi = await getMusics(id);
    this.setState({ musics: requestFromApi });
  }

  async favoriteSongRequest() {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({ favoritesSongs });
  }

  isFvorites(song) {
    const { favoritesSongs } = this.state;
    return favoritesSongs.some((track) => track.trackId === song);
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length !== 0 && (
          <div>
            <div>
              <h3 data-testid="artist-name">{ musics[0].artistName }</h3>
              <h4 data-testid="album-name">{ musics[0].collectionName }</h4>
            </div>
            {musics.slice(1).map((music) => (
              <ol key={ music.trackId }>
                <li>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    musics={ music }
                    handlerChecked={ this.handlerChecked }
                    isFvorites={ this.isFvorites }
                  />
                </li>
              </ol>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
