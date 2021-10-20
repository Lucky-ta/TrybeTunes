import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonState: true,
    };
  }

  enableButton = ({ target }) => {
    const minCharacters = 2;
    return target.value.length >= minCharacters
      ? this.setState({ buttonState: false })
      : this.setState({ buttonState: true });
  };

  render() {
    const { buttonState } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="search-musics">
          <input
            onChange={ this.enableButton }
            data-testid="search-artist-input"
            type="text"
          />
          <button
            disabled={ buttonState }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
