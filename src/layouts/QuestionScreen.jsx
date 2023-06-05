import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  totalCorrectAnswers,
  totalQuestions,
  endTime,
  setWrongAnswers,
} from "../redux/action";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import "./style.css";

const QuestionScreen = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userWrongAnswers, setUserWrongAnswers] = useState([]);
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://opentdb.com/api.php?amount=5")
        .then((response) => {
          const fetchedQuestions = response.data.results;
          setQuestions(fetchedQuestions);
          const options = [
            fetchedQuestions[0].correct_answer,
            ...fetchedQuestions[0].incorrect_answers,
          ];
          setAnswers(options);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const [selected, setSelected] = useState(Array(answers.length).fill(false));
  const handleOptionSelect = (option, index) => {
    setClick(true);
    setSelectedOption(option);
    checkAnswer(option);
    const newSelected = Array(answers.length).fill(false);
    newSelected[index] = true;
    setSelected(newSelected);
  };
  const checkAnswer = (option) => {
    if (option === questions[questionIndex].correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      // get question incorrect
      const wrongAnswer = {
        question: questions[questionIndex].question,
        correctAnswer: questions[questionIndex].correct_answer,
        selectedOption: option,
      };
      setUserWrongAnswers((prevAnswers) => [...prevAnswers, wrongAnswer]);
    }
  };
  const handleNextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      // dispatch data
      dispatch(endTime(new Date()));
      dispatch(totalCorrectAnswers(correctAnswers));
      dispatch(totalQuestions(questions.length));
      dispatch(setWrongAnswers(userWrongAnswers));

      navigate("/result");
    } else {
      if (selectedOption === "") {
        return null;
      }
      const nextQuestionIndex = questionIndex + 1;
      const nextQuestion = questions[nextQuestionIndex];
      setQuestionIndex(nextQuestionIndex);
      const options = [
        nextQuestion.correct_answer,
        ...nextQuestion.incorrect_answers,
      ];
      setAnswers(options);
      setSelectedOption("");
      setSelected(false);
      setClick(false);
    }
  };

  return (
    <>
      {loading ? (
        <Box mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Typography variant="h5" component="div" className="number__question">
            Question {questionIndex + 1}/{questions.length}:{" "}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            className="question__content"
          >
            {questions[questionIndex]?.question}
          </Typography>
          {answers.map((option, index) => (
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={8}
              key={index}
            >
              <Button
                onClick={() => handleOptionSelect(option, index)}
                variant="text"
                className={`btn__option ${
                  selected[index] ? "option__choose" : ""
                } `}
              >
                <div className="button__content">
                  <Typography variant="body" component="div">
                    {" "}
                    {option}
                  </Typography>
                  <Typography variant="body" component="span">
                    {selected[index] ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <PanoramaFishEyeIcon />
                    )}
                  </Typography>
                </div>
              </Button>
            </Stack>
          ))}

          <Button
            onClick={handleNextQuestion}
            className={` btn__next ${click ? "btn__next_click" : ""}`}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default QuestionScreen;
