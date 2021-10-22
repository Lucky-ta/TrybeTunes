import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      accept: false,
    };
    this.userRequest = this.userRequest.bind(this);
  }

  componentDidMount() {
    this.userRequest();
  }

  async userRequest() {
    const getUserRequest = await getUser();
    this.setState({ userName: getUserRequest.name, accept: true });
  }

  render() {
    const { userName, accept } = this.state;
    return (
      <header data-testid="header-component">
        {userName.length === 0 && <Loading /> }
        {accept && <h3 data-testid="header-user-name">{ userName }</h3>}
        <Route>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <br />
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <br />
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </Route>
      </header>
    );
  }
}

export default Header;
