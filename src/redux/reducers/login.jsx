export const LOGIN = 'LOGIN';

const INITIAL_STATE = {
  email: '',
  image: '',
  name: '',
  responseToken: {},
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      email: action.email,
      name: action.name,
      image: action.responseGravatar,
      responseToken: action.responseToken,
    };
  default:
    return state;
  }
};

export default user;
