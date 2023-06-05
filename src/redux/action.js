import {
  SET_START_TIME,
  SET_CORRECT_ANSWERS,
  SET_TOTAL_QUESTIONS,
  SET_END_TIME,
  SET_WRONG_ANSWERS,
  RESET_QUIZ,
} from "./actionType";

export const startTime = (startTime) => ({
  type: SET_START_TIME,
  payload: startTime,
});
export const endTime = (endTime) => ({
  type: SET_END_TIME,
  payload: endTime,
});
export const totalCorrectAnswers = (totalCorrectAnswers) => ({
  type: SET_CORRECT_ANSWERS,
  payload: totalCorrectAnswers,
});

export const totalQuestions = (totalQuestions) => ({
  type: SET_TOTAL_QUESTIONS,
  payload: totalQuestions,
});
export const setWrongAnswers = (wrongAnswers) => ({
  type: SET_WRONG_ANSWERS,
  payload: wrongAnswers,
});
export const resetQuiz = () => {
  return {
    type: RESET_QUIZ,
  };
};
