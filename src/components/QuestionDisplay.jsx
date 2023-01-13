import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const THREE = 3;
let numberIndex = 0 - 1;

class QuestionDisplay extends Component {
  state = {
    allAnswers: [],
    question: 0,
  };

  randomAnswers = () => {
    const { responseToken: { results } } = this.props;
    const { allAnswers, question } = this.state;
    allAnswers.push([results[question].correct_answer,
      ...results[question].incorrect_answers]);
  };

  numberWrongAnswer = () => {
    numberIndex = numberIndex > THREE ? 0 : numberIndex + 1;
    return numberIndex;
  };

  handleClick = () => {
    let { question } = this.state;
    const numberQuestion = question > THREE ? 0 : question += 1;
    this.setState({ question: numberQuestion, allAnswers: [] });
  };

  render() {
    this.randomAnswers();
    const { responseToken } = this.props;
    const { allAnswers, question } = this.state;

    return (
      <div>
        <p
          data-testid="question-category"
        >
          { responseToken.results[question].category }

        </p>
        <p data-testid="question-text">{ responseToken.results[question].question }</p>
        {allAnswers.map((valueQuestion) => (valueQuestion.map((element, index) => (
          <button
            key={ `${valueQuestion} = ${index}` }
            data-testid={
              element === responseToken.results[question].correct_answer
                ? 'correct-answer'
                : `wrong-answer-${this.numberWrongAnswer()}`
            }
            type="button"
          >
            { element }
          </button>))))}

        <br />
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.handleClick }
        >
          Next
        </button>
      </div>
    );
  }
}
QuestionDisplay.propTypes = {
  responseToken: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string,
      question: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf,
      correct_answer: PropTypes.string,
    })),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  responseToken: state.login.responseToken,
});

export default connect(mapStateToProps)(QuestionDisplay);
