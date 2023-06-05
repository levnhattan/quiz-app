import React from "react";
import { Box, Button, Container } from "@mui/material";
import { useDispatch } from 'react-redux';
import StartImg from "../assets/images/start_quiz.png";
import { useNavigate } from "react-router-dom";
import { startTime, resetQuiz} from "../redux/action";

import './style.css';

const QuizApp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    dispatch(resetQuiz());
    dispatch(startTime(new Date()));
    navigate("/question");
  };
  
  return (
    <Container maxWidth="lg">
       <Box>
          <img src={StartImg} alt="Image Quiz" />
          <Button className="btn__start" onClick={handleStartQuiz}>
            {" "}
            Start Quiz!
          </Button>
        </Box>
    </Container>
  );
};

export default QuizApp;
