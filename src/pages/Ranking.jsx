import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ONE = -1;

class Ranking extends Component {
  state = {
    ranging: [],
  };

  componentDidMount() {
    const arrayPlayers = JSON.parse(localStorage.getItem('players'));
    console.log(arrayPlayers);

    arrayPlayers.sort((p1, p2) => (((p1.score > p2.score)
      ? 1 : (p1.score > p2.score)) ? ONE : 0));

    this.setState({ ranging: arrayPlayers });

    // console.log(arrayPlayers);
  }

  btnHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranging } = this.state;
    // const arrayPlayers = JSON.parse(localStorage.getItem('players'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking </h1>
        {ranging.map((element, index) => (
          <div key={ `${element.name} = ${element}` }>
            <img
              src={ element.image }
              data-testid="header-profile-picture"
              alt="avatar img"
            />
            <p
              data-testid={
                `player-name-${index}`
              }
            >
              {element.name}

            </p>
            <p
              data-testid={
                `player-score-${index}`
              }
            >
              {element.score}
            </p>
          </div>
        ))}

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.btnHome }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect()(Ranking);

// arrayPlayers.findIndex((ele) => ele.name === element.name)
