import React from "react";
import Button from "@mui/material/Button";

const EndWorkoutButton = ({
  shouldLoad,
  setShouldLoad,
  postWorkoutResults,
  checkValidityOfWorkout,
  buttonWidth,
  buttonHeight,
}) => {
  function handleStopClick() {
    setShouldLoad(false);
    postWorkoutResults();
  }

  if (shouldLoad) {
    return (
      <Button
        sx={{
          borderRadius: 0,
          backgroundColor: "#420217",
          width: buttonWidth,
          height: buttonHeight,
          fontFamily: "Noto Sans",
          fontWeight: "700",
          fontSize: 14,
          [`&:hover`]: { backgroundColor: "#420C14" },
        }}
        variant="contained"
        onClick={handleStopClick}
        disabled={checkValidityOfWorkout()}
      >
        End Workout
      </Button>
    );
  }
};

export default EndWorkoutButton;
