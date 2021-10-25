import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: false,
      favoritesSongs: [],
    };
    this.musicsRequest = this.musicsRequest.bind(this);
    this.addSongOnClick = this.addSongOnClick.bind(this);
  }

  componentDidMount() {
    this.musicsRequest();
  }

  isFavorite = (trackId) => {
    const { favoritesSongs } = this.state;
    const favorite = favoritesSongs.some((track) => track.trackId === trackId);
    if (favorite) return true;
    return false;
  }

  // Créditos: Bruno Bartolomeu por me ajudar a entender esta logica de adicionar aos favoritos
  // link do commit: https://github.com/tryber/sd-015-b-project-trybetunes/pull/40/commits/c7cd2b6a4c1ffe9cf788d2e8bdeaaeec87746126
  addFavorites = () => {
    this.setState({ loading: true });
    getFavoriteSongs()
      .then((favorites) => this.setState({
        loading: false,
        favoritesSongs: favorites,
      }));
  }

  async addSongOnClick(track) {
    this.setState({ loading: true });
    addSong(track)
    // Crédito: Bruno Bartolomeu para este loading
    // - link do commit: https://github.com/tryber/sd-015-b-project-trybetunes/pull/40/commits/b937e0a54a68ec93c3e12effaeb2e04aa7a11d2c
      .then(() => this.setState((prevState) => ({
        loading: false,
        favoritesSongs: [...prevState.favoritesSongs, track],
      })));
  }

  async musicsRequest() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ musics: await getMusics(id) });
    this.addFavorites();
  }

  render() {
    const { musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        { loading && <Loading /> }
        <Header />
        {musics.length && (
          <div key={ musics[0].amgArtistId }>
            <p data-testid="artist-name">{`Nome do artista: ${musics[0].artistName} `}</p>
            <p
              data-testid="album-name"
            >
              { `Nome da coleção: ${musics[0].collectionName}` }
            </p>
            {musics.slice(1).map((musica) => (
              <MusicCard
                key={ musica.trackId }
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
                trackId={ musica.trackId }
                addSongOnClick={ this.addSongOnClick }
                isFavorite={ this.isFavorite }
              />
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
