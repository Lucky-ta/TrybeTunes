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
    const requestFromApi = await getMusics(id);
    this.setState({ musics: requestFromApi });
  }

  render() {
    const { musics } = this.state;
    console.log(musics);
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
