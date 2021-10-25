import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: false,
    };
    this.musicsRequest = this.musicsRequest.bind(this);
    this.addSongOnClick = this.addSongOnClick.bind(this);
  }

  componentDidMount() {
    this.musicsRequest();
  }

  async musicsRequest() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ musics: await getMusics(id) });
  }

  async addSongOnClick(song, target) {
    this.setState({ loading: true });
    if (!target) await addSong(song);
    this.setState({ loading: false });
    if (target) await removeSong(song);
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
