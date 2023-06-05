import {
  SET_START_TIME,
  SET_CORRECT_ANSWERS,
  SET_TOTAL_QUESTIONS,
  SET_END_TIME,
  SET_WRONG_ANSWERS,
  RESET_QUIZ,
} from "./actionType";

const initState = {
  startTime: null,
  endTime: null,
  correctAnswers: 0,
  totalQuestions: 0,
  wrongAnswers: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    case SET_END_TIME:
      return {
        ...state,
        endTime: action.payload,
      };
    case SET_CORRECT_ANSWERS:
      return {
        ...state,
        totalCorrectAnswers: action.payload,
      };
    case SET_TOTAL_QUESTIONS:
      return {
        ...state,
        totalQuestions: action.payload,
      };
    case SET_WRONG_ANSWERS:
      return {
        ...state,
        wrongAnswers: action.payload,
      };
    case RESET_QUIZ:
      return initState;
    default:
      return state;
  }
};

export default reducer;
