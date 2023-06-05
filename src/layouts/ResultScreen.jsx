import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import congraImg from "../assets/images/congra.png";
import completeImg from "../assets/images/complete.png";

import "./style.css";

// Dialog MUI
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ResultScreen = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const startTime = useSelector((state) => state.startTime);
  const endTime = useSelector((state) => state.endTime);
  const totalCorrectAnswers = useSelector((state) => state.totalCorrectAnswers);
  const totalQuestions = useSelector((state) => state.totalQuestions);
  const wrongAnswers = useSelector((state) => state.wrongAnswers);
  

  const navigate = useNavigate();
  const timeInSeconds = Math.floor((endTime - startTime) / 1000);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    let formattedTime = "";
    if (hours > 0) {
      formattedTime += hours === 1 ? `${hours} hour ` : `${hours} hours `;
    }
    if (minutes > 0) {
      formattedTime +=
        minutes === 1 ? `${minutes} minute ` : `${minutes} minutes `;
    }
    if (seconds > 0) {
      formattedTime +=
        seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
    }
    return formattedTime.trim();
  };
  const formattedTime = formatTime(timeInSeconds);


  const handleRestartQuiz = () => {
    navigate("/");
  };
  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit?");
    if (confirmExit) {
      window.close();
    }
  };
  return (
    <Box
      sx={{
        color: "black",
        background: "white",
        height: "400px",
        width: "70%",
        borderRadius: "15px",
      }}
    >
      {totalCorrectAnswers >= 4 ? (
        <>
          <img src={congraImg} alt="Img" width="50%" height="50%" />
          <Typography variant="h5">You are amazing!</Typography>
        </>
      ) : (
        <>
          <img src={completeImg} alt="Img" width="50%" height="50%" />
          <Typography variant="h5">Better luck next time!</Typography>
        </>
      )}

      <Typography variant="body1" mt={2}>
        {totalCorrectAnswers}/{totalQuestions} correct answers in{" "}
        {formattedTime}
      </Typography>

      <Button
        className="btn__restart"
        variant="contained"
        onClick={handleRestartQuiz}
      >
        Play Again
      </Button>
      {totalCorrectAnswers !== 5 ? (
        <>
          <Button
            onClick={handleClickOpen}
            className="btn__restart"
            variant="contained"
          >
            Review Answers
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Incorrect Answers:
            </BootstrapDialogTitle>
            <DialogContent dividers>
              {wrongAnswers?.length > 0 ? (
                wrongAnswers.map((answer, index) => (
                  <Box key={index}>
                    <Typography variant="body1" height="100%" width="100%">
                      {index + 1}. {answer.question}
                    </Typography>
                    <Typography variant="body2" color="red">
                      Your Answer: {answer.selectedOption}
                    </Typography>
                    <Typography variant="body2" color="green">
                      Correct Answer: {answer.correctAnswer}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body1">No wrong answers</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Close
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </>
      ) : (
        ""
      )}

      <Button className="btn__restart" variant="contained" onClick={handleExit}>
        Exit
      </Button>
    </Box>
  );
};

export default ResultScreen;
