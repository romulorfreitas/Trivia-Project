import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const THREE = 3;

class Feedback extends Component {
  render() {
    const { score, image, name, assertions } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <img src={ image } data-testid="header-profile-picture" alt="avatar img" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">
          { score }
        </h2>
        <h1 data-testid="feedback-total-score">{ score }</h1>
        <h3 data-testid="feedback-total-question">{ assertions }</h3>
        {
          assertions >= THREE
            ? <h1 data-testid="feedback-text">Well Done!</h1>
            : <h1 data-testid="feedback-text">Could be better...</h1>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  assertions: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  image: state.login.image,
  name: state.login.name,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
