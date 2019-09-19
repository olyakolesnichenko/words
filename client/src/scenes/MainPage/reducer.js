import {fetchWords} from '../../routines/routines';

const initialState = {
  currentWord: '',
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case fetchWords.TRIGGER:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case fetchWords.SUCCESS:
    return {
      ...state,
      currentWord: action.payload.word
    };
  case fetchWords.FAILURE: {
    return {
      ...state,
      error: action.payload
    };
  }
  case fetchWords.FULFILL:
    return {
      ...state,
      loading: false
    };

  default:
    return state;
  }
};
