export const PLAYER = 'PLAYER';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER:
    return { ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default user;
