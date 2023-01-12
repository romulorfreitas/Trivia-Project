import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionDisplay extends Component {
  render() {
    const { responseToken } = this.props;
    const incorrectAnswer = responseToken.results[0].incorrect_answers;
    return (
      <div>
        <p data-testid="question-category">{ responseToken.results[0].category }</p>
        <p data-testid="question-text">{ responseToken.results[0].question }</p>
        <button
          data-testid="correct-answer"
          type="button"
        >
          { responseToken.results[0].correct_answer }
        </button>

        <button
          // data-testid="wrong-answer-${index}"
          type="button"
        >
          { incorrectAnswer[0] }
        </button>
        ;

        <button
        //   data-testid="wrong-answer-${index}"
          type="button"
        >
          { incorrectAnswer[0] }
        </button>
        <button
        //   data-testid="wrong-answer-${index}"
          type="button"
        >
          { incorrectAnswer[1] }
        </button>
        <button
        //   data-testid="wrong-answer-${index}"
          type="button"
        >
          { incorrectAnswer[2] }
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
