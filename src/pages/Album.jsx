import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
    this.musicsRequest = this.musicsRequest.bind(this);
  }

  componentDidMount() {
    this.musicsRequest();
  }

  async musicsRequest() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ musics: await getMusics(id) });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length && (
          <div key={ musics[0].collectionId }>
            <p data-testid="artist-name">{`Nome do artista: ${musics[0].artistName} `}</p>
            <p
              data-testid="album-name"
            >
              { `Nome da coleção: ${musics[0].collectionName}` }
            </p>
            {musics.slice(1).map((musica) => (
              <MusicCard
                key={ musica.collectionId }
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
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
