import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { triviaRequest } from '../services/apiTrivia';
import QuestionDisplay from '../components/QuestionDisplay';
// import { randomAnswers } from '../components/QuestionDisplay';

class Game extends Component {
  async componentDidMount() {
    const { history } = this.props;
    const errorResponse = 3;
    const tokenKey = localStorage.getItem('token');

    const responseToken = await triviaRequest(tokenKey);

    if (responseToken.response_code === errorResponse) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { name, image } = this.props;
    return (
      <div className="App-header">
        <img src={ image } data-testid="header-profile-picture" alt="avatar img" />
        <h2>Trybe</h2>
        <h3 data-testid="header-score">Score: 0</h3>
        <h2 data-testid="header-player-name">{ name }</h2>
        <QuestionDisplay />
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  image: state.login.image,
});

export default connect(mapStateToProps)(Game);
