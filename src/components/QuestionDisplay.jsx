import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const THREE = 3;
const TEN = 10;
const FOUR = 4;
let numberIndex = 0 - 1;
const milliseconds = 1000;
let assertions = 0;
let test = 0;

class QuestionDisplay extends Component {
  state = {
    allAnswers: [],
    questionNumber: 0,
    answerNumber: 0,
    buttonNext: false,
    buttonStyle: false,
    time: 30,
    disabled: false,
  };

  componentDidMount() {
    this.randomAnswers();
    this.startTimer();
    clearInterval(this.intervalId);
  }

  startTimer = () => {
    const intervalId = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState((prevState) => ({ time: prevState.time - 1 }));
      } else {
        this.setState({ disabled: true });
        clearInterval(intervalId);
      }
    }, milliseconds);
  };

  randomAnswers = () => {
    this.setState({ buttonNext: false });
    const {
      responseToken: { results },
    } = this.props;
    const { answerNumber } = this.state;

    const arrayOrigin = [
      results[answerNumber].correct_answer,
      ...results[answerNumber].incorrect_answers,
    ];

    const arrayRamdom = [];

    arrayOrigin.forEach((element) => {
      arrayRamdom.splice(
        Math.floor(Math.random() * arrayOrigin.length),
        0,
        element,
      );
    });

    this.setState({ allAnswers: arrayRamdom });

    const numberQuestion = answerNumber > THREE ? 0 : answerNumber + 1;
    this.setState({ answerNumber: numberQuestion });
  };

  numberWrongAnswer = async () => {
    numberIndex = numberIndex > 1 ? 0 : numberIndex + 1;
    return numberIndex;
  };

  handleAnswerClick = ({ target }) => {
    const { responseToken: { results }, dispatch } = this.props;
    const { allAnswers, time, questionNumber } = this.state;

    const selectedAnswer = target.parentElement.innerText;

    const difficultyAnswer = results[questionNumber].difficulty;

    allAnswers.filter((element) => element === selectedAnswer
    && this.setState({ buttonNext: true, disabled: false }));

    this.setState({ buttonStyle: true });
    const punctuationDifficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    if (selectedAnswer === results[questionNumber].correct_answer) {
      test += TEN + (punctuationDifficulty[difficultyAnswer] * time);
      assertions += 1;
    }
    dispatch({
      type: 'PLAYER',
      score: test,
      assertions,
    });
  };

  handleClick = () => {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const numberQuestion = questionNumber > THREE ? 0 : questionNumber + 1;
    this.setState({ questionNumber: numberQuestion, buttonStyle: false });
    this.randomAnswers();

    if (+questionNumber === FOUR) {
      test = 0;
      history.push('/feedback');
    }
  };

  CollorBorder = (item) => {
    const {
      responseToken: { results },
    } = this.props;
    const { questionNumber, buttonStyle } = this.state;

    const answerCorrect = results[questionNumber].correct_answer;

    if (buttonStyle) {
      if (item === answerCorrect) {
        return 'solid rgb(6, 240, 15) 3px';
      }
      return 'solid red 3px';
    }
  };

  render() {
    const { responseToken } = this.props;
    const { allAnswers, questionNumber, buttonNext, disabled, time } = this.state;

    return (
      <div>
        <p>
          { time }
        </p>
        <p
          data-testid="question-category"
        >
          { responseToken.results[questionNumber].category }
        </p>
        <p data-testid="question-text">
          {responseToken.results[questionNumber].question}
        </p>
        {allAnswers.map((element, index) => (
          <div key={ `${element} = ${index}` } data-testid="answer-options">
            <button
              data-testid={
                element === responseToken.results[questionNumber].correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${this.numberWrongAnswer()}`
              }
              type="button"
              onClick={ this.handleAnswerClick }
              style={ { border: this.CollorBorder(element) } }
              disabled={ disabled }
            >
              {element}
            </button>
          </div>
        ))}
        <br />
        <div>
          <p>{`Time left: ${time} seconds`}</p>
        </div>
        {buttonNext && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClick }
            disabled={ disabled }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

QuestionDisplay.propTypes = {
  dispatch: PropTypes.func.isRequired,
  responseToken: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string,
      question: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf,
      correct_answer: PropTypes.string,
      difficulty: PropTypes.string,
    })),

  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuestionDisplay));
