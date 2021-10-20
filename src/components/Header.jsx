import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingText from './LoadingText';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loadingText: false,
      userName: '',
    };
    this.handleGetUser = this.handleGetUser.bind(this);
  }

  componentDidMount() {
    this.handleGetUser();
  }

  async handleGetUser() {
    this.setState({ loadingText: true });
    this.setState({ userName: await getUser() });
    this.setState({ loadingText: false });
  }

  render() {
    const { loadingText, userName } = this.state;
    const { name } = userName;
    if (loadingText) return <LoadingText />;
    if (loadingText === false) {
      return (
        <header data-testid="header-component">
          <h3 data-testid="header-user-name">{ name }</h3>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <br />
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <br />
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </header>
      );
    }
  }
}

export default Header;
