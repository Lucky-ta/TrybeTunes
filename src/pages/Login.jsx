import React from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const minChar = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      loading: false,
      accept: false,
    };
    this.handlerInput = this.handlerInput.bind(this);
    this.requestApi = this.requestApi.bind(this);
  }

  componentDidMount() {
    return this.requestApi;
  }

  handlerInput({ target }) {
    this.setState({ inputValue: target.value });
  }

  async requestApi() {
    const { inputValue } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputValue });
    this.setState({ loading: false, accept: true });
  }

  render() {
    const { inputValue, loading, accept } = this.state;
    if (loading) return <Loading />;
    if (accept) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <form action="Login">
          <input
            data-testid="login-name-input"
            type="text"
            onChange={ this.handlerInput }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ inputValue.length < minChar }
            onClick={ this.requestApi }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
