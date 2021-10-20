import React from 'react';
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
        </header>
      );
    }
  }
}

export default Header;
