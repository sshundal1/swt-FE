import { Box } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import MuscleList from "./WorkoutIntro/MuscleList";

const WorkoutIntro = ({
  shouldLoad,
  setShouldLoad,
  fetchDefaultExerciseList,
  selectedMuscleGroups,
  setSelectedMuscleGroups,
}) => {
  function handleClick() {
    setShouldLoad(true);
    fetchDefaultExerciseList();
  }

  function areMusclesSelected() {
    if (Object.keys(selectedMuscleGroups).length === 0) {
      return true;
    }
    return false;
  }

  if (shouldLoad) {
    return (
      <Box>
        <Box
          bgcolor="#FFFFFF"
          width="400px"
          maxWidth="90vw"
          minHeight="300px"
          sx={{
            boxShadow: 2,
            borderRadius: 3,
            borderColor: "#8e936d",
            p: 1,
          }}
        >
          <Typography
            fontFamily="Noto Sans"
            fontSize={18}
            fontWeight={500}
            paddingTop={2}
            textAlign="center"
            marginLeft={0}
            width="80%"
            paddingBottom={2}
          >
            Select the target muscles for your workout
          </Typography>
          <MuscleList setSelectedMuscleGroups={setSelectedMuscleGroups} />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100px"
          >
            <Button
              disabled={areMusclesSelected()}
              variant="contained"
              color="error"
              onClick={handleClick}
              style={{ width: 170, height: 50 }}
              sx={{
                borderRadius: 1,
                backgroundColor: "#00171F",
                [`&:hover`]: { backgroundColor: "#00171F" },
              }}
            >
              <Typography fontFamily="Noto Sans">Start Workout</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default WorkoutIntro;
