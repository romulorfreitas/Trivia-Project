import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import getCurrentValue from '../services/apiTrivia';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isEnterButtonDisabled: true,
  };

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { email, name } = this.state;

      const releaseButton = !email.includes('@', 1)
        || !name.length > 0
        || !email.includes('.com', 1);

      this.setState({
        isEnterButtonDisabled: releaseButton,
      });
    });
  };

  settingBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  enterButton = async () => {
    const score = 0;
    const assertions = 0;
    const { dispatch, history } = this.props;
    const { email, name } = this.state;
    const response = await getCurrentValue();
    localStorage.setItem('token', response.token);

    const convertEmail = md5(email).toString();
    const responseGravatar = `https://www.gravatar.com/avatar/${convertEmail}`;

    dispatch({
      type: 'LOGIN',
      email,
      name,
      responseGravatar,
    });

    dispatch({
      type: 'PLAYER',
      score,
      assertions,
    });

    history.push('/game');
  };

  render() {
    const { isEnterButtonDisabled } = this.state;
    return (
      <div className="login-container">
        <label htmlFor="name">
          Player name
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            id="name"
            placeholder="name"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="input-gravatar-email"
            name="email"
            type="email"
            id="email"
            placeholder="E-mail"
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="btn-play"
          className="button"
          type="button"
          disabled={ isEnterButtonDisabled }
          onClick={ this.enterButton }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          className="button"
          type="button"
          onClick={ this.settingBtn }
        >
          Configuração
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
