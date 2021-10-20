import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import LoadingText from '../components/LoadingText';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonState: true,
      userName: '',
      loadingText: false,
      accept: false,
    };
    this.saveName = this.saveName.bind(this);
  }

  enableButton = ({ target }) => {
    const minInputChar = 3;
    return (
      target.value.length >= minInputChar
        ? this.setState({ buttonState: false },
          () => this.setState({ userName: target.value }))
        : this.setState({ buttonState: true })
    );
  }

  async saveName() {
    const { userName } = this.state;
    this.setState({ loadingText: true });
    await createUser({ name: userName });
    this.setState({ loadingText: false, accept: true });
  }

  render() {
    const { buttonState, loadingText, accept } = this.state;
    if (loadingText) return <LoadingText />;
    if (accept) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <form action="signUp">
          <input
            onChange={ this.enableButton }
            type="text"
            name="User-Name"
            id="login-name-input"
            data-testid="login-name-input"
          />
          <button
            onClick={ this.saveName }
            disabled={ buttonState }
            type="button"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
