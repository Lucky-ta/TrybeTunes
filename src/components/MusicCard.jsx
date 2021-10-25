import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      check: false,
    };
    this.isChecked = this.isChecked.bind(this);
  }

  isChecked({ target }) {
    this.setState({ check: target.checked });
  }

  render() {
    const { trackName, previewUrl, trackId, addSongOnClick } = this.props;
    const { check } = this.state;
    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onChange={ this.isChecked }
            onClick={ () => addSongOnClick({ trackName, previewUrl, trackId }, check) }
            checked={ check }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  addSongOnClick: PropTypes.func.isRequired,
};

export default MusicCard;
