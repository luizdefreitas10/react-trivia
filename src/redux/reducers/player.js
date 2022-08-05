import { SET_PLAYER_NAME, SET_PLAYER_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_NAME:
    return { ...state, name: action.payload };
  case SET_PLAYER_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  default:
    return state;
  }
};

export default player;
