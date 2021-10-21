import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingText from '../components/LoadingText';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      fixedInputValue: '',
      albums: [],
      loadingText: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.albumRequest = this.albumRequest.bind(this);
  }

  componentDidMount() {
    this.albumRequest();
  }

  handleInputValue({ target }) {
    this.setState({ inputValue: target.value });
  }

  async albumRequest() {
    const { inputValue } = this.state;
    this.setState({ loadingText: true });
    this.setState({ albums: await searchAlbumsAPI(inputValue) });
    this.setState({ loadingText: false });
    this.setState({ fixedInputValue: inputValue });
    this.setState({ inputValue: '' });
  }

  render() {
    const minCharaters = 2;
    const { inputValue, albums, loadingText, fixedInputValue } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form action="search-musics">
          <input
            value={ inputValue }
            onChange={ this.handleInputValue }
            data-testid="search-artist-input"
            type="text"
            hidden={ loadingText }
          />
          <button
            disabled={ inputValue.length < minCharaters }
            data-testid="search-artist-button"
            type="button"
            onClick={ this.albumRequest }
            hidden={ loadingText }
          >
            Pesquisar
          </button>
          <br />
          {loadingText && <LoadingText />}
          {albums.length !== 0 && `Resultado de álbuns de: ${fixedInputValue}`}
          {albums.map((album) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt="" />
              <h4>{ album.collectionName }</h4>
              <h5>{ `Price: ${album.collectionPrice}` }</h5>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Ir para Album
              </Link>
            </div>
          ))}
          {fixedInputValue.length !== albums.length && 'Nenhum álbum foi encontrado'}
        </form>
      </div>
    );
  }
}

export default Search;
