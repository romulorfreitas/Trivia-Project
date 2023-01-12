import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { name, image } = this.props;
    return (
      <div className="App-header">
        <img src={ image } data-testid="header-profile-picture" alt="avatar img" />
        <h2>Trybe</h2>
        <h3 data-testid="header-score">Score: 0</h3>
        <h2 data-testid="header-player-name">{ name }</h2>
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  image: state.login.image,
});

export default connect(mapStateToProps)(Game);
