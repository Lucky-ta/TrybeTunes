import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const minChar = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      InputValue: '',
      fixedInputValue: '',
      loading: false,
      albums: [],
    };
    this.handlerInputValue = this.handlerInputValue.bind(this);
    this.requestAlbumApi = this.requestAlbumApi.bind(this);
  }

  handlerInputValue({ target }) {
    this.setState({ InputValue: target.value });
  }

  async requestAlbumApi() {
    const { InputValue } = this.state;
    this.setState({ loading: true, fixedInputValue: InputValue });
    const albumRequest = await searchAlbumsAPI(InputValue);
    this.setState({ InputValue: '', loading: false, albums: albumRequest });
  }

  render() {
    const { InputValue, loading, fixedInputValue, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="search-musics">
          <input
            value={ InputValue }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handlerInputValue }
            hidden={ loading }
            placeholder="Pesquise o nome do artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ InputValue.length < minChar }
            onClick={ this.requestAlbumApi }
            hidden={ loading }
          >
            Pesquisar
          </button>
          {loading && <Loading />}
          {fixedInputValue.length > albums.length && 'Nenhum álbum foi encontrado'}
          {albums.length !== 0 && `Resultado de álbuns de: ${fixedInputValue}`}
          <br />
          {albums.map((album) => (
            <div key={ album.collectionId }>
              <h4>{ album.artistName }</h4>
              <img src={ album.artworkUrl100 } alt="Imagem do album" />
              <p>{ album.collectionName }</p>
              <h4>{ album.collectionPrice }</h4>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Ir para o album
              </Link>
            </div>
          ))}
          <br />
        </form>
      </div>
    );
  }
}

export default Search;
