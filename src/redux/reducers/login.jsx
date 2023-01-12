export const LOGIN = 'LOGIN';

const INITIAL_STATE = {
  email: '',
  image: '',
  name: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      email: action.email,
      name: action.name,
      image: action.responseGravatar,
    };
  default:
    return state;
  }
};

export default user;
