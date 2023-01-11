import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  enterButton = () => {
    const { dispatch } = this.props;
    const { email } = this.state;

    dispatch({
      type: 'LOGIN',
      email,
    });
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
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }).isRequired,
};

export default connect()(Login);
