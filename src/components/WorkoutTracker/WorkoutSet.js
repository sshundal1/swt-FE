import React, { useState } from "react";

import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import WorkoutCard from "./WorkoutSet/WorkoutCard";
import CircularProgress from "@mui/material/CircularProgress";
import Zoom from "@mui/material/Zoom";

const WorkoutSet = ({
  shouldLoad,
  setShouldLoad,
  exerciseList,
  apiLoading,
  fetchFullExerciseList,
  defaultExerciseList,
  setDefaultExerciseList,
  fullExerciseList,
  setExerciseList,
}) => {
  const [userWorkoutLog, setUserWorkoutLog] = useState({
    1: {
      set_stats: { 1: { lbs: "", reps: "" } },
      exercise_name: "",
      exercise_info: null,
    },
  });

  const [cardNumber, setCardNumber] = useState(1);

  const { getAccessTokenSilently } = useAuth0();

  const postWorkoutResults = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
      body: JSON.stringify({
        userWorkoutLog: { ...userWorkoutLog },
      }),
    };
    fetch(process.env.REACT_APP_AWS_MUSCLE_LINK_POST, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("need to add"));
  };

  function handleUpdate() {
    userWorkoutLog[cardNumber]["set_stats"][
      Object.keys(userWorkoutLog[cardNumber]["set_stats"]).length + 1
    ] = { lbs: "", reps: "" };
    setUserWorkoutLog({ ...userWorkoutLog });
  }

  function handleTurnClick(direction) {
    setChecked(false);
    setTimeout(() => {
      setChecked(true);
    }, "200");
    setTimeout(() => {
      if (direction === "Right") {
        setCardNumber(cardNumber + 1);
        if (cardNumber + 1 > Object.keys(userWorkoutLog).length) {
          let updatedVal = {
            [Object.keys(userWorkoutLog).length + 1]: {
              set_stats: { 1: { lbs: "", reps: "" } },
              exercise_name: "",
              exercise_info: null,
            },
          };
          setUserWorkoutLog((setUserWorkoutLog) => ({
            ...userWorkoutLog,
            ...updatedVal,
          }));
        }
      } else {
        if (cardNumber >= 2) {
          setCardNumber(cardNumber - 1);
        }
      }
    }, "50");
  }

  function handleSwitchChange(checked) {
    if (checked) {
      setExerciseList(fullExerciseList);
    } else {
      setExerciseList(defaultExerciseList);
    }
  }

  const [checked, setChecked] = React.useState(true);

  function copy(x) {
    return JSON.parse(JSON.stringify(x));
  }

  function handleDuplicate() {
    userWorkoutLog[cardNumber]["set_stats"][
      Object.keys(userWorkoutLog[cardNumber]["set_stats"]).length + 1
    ] = copy(
      userWorkoutLog[cardNumber]["set_stats"][
        Object.keys(userWorkoutLog[cardNumber]["set_stats"]).length
      ]
    );
    setUserWorkoutLog({ ...userWorkoutLog });
  }

  function handleDelete(setNumber) {
    let newWorkoutLog = { 1: { lbs: "", reps: "" } };
    if (
      parseInt(setNumber) ===
      Object.keys(userWorkoutLog[cardNumber]["set_stats"]).length
    ) {
      delete userWorkoutLog[cardNumber]["set_stats"][parseInt(setNumber)];
    } else {
      for (const workoutSet in userWorkoutLog[cardNumber]["set_stats"]) {
        if (
          parseInt(workoutSet) ===
          Object.keys(userWorkoutLog[cardNumber]["set_stats"]).length
        ) {
          userWorkoutLog[cardNumber]["set_stats"] = newWorkoutLog;
        } else if (parseInt(workoutSet) >= parseInt(setNumber)) {
          newWorkoutLog[parseInt(workoutSet)] =
            userWorkoutLog[cardNumber]["set_stats"][parseInt(workoutSet) + 1];
        } else {
          newWorkoutLog[parseInt(workoutSet)] =
            userWorkoutLog[cardNumber]["set_stats"][parseInt(workoutSet)];
        }
      }
    }
    setUserWorkoutLog({ ...userWorkoutLog });
  }

  if (!shouldLoad) {
    return;
  } else {
    if (!apiLoading) {
      return (
        <>
          <Zoom
            in={!apiLoading && checked}
            style={{
              transitionDelay: !apiLoading && checked ? "500ms" : "0ms",
            }}
          >
            <Box>
              <Box
                display="flex"
                bgcolor="#FFFFFF"
                width="400px"
                maxWidth="90vw"
                gap="10px"
                minHeight="300px"
                sx={{
                  boxShadow: 2,
                  borderRadius: 3,
                  borderColor: "#8e936d",
                  p: 1,
                }}
              >
                <WorkoutCard
                  handleTurnClick={handleTurnClick}
                  cardNumber={cardNumber}
                  handleUpdate={handleUpdate}
                  userWorkoutLog={userWorkoutLog}
                  setUserWorkoutLog={setUserWorkoutLog}
                  exerciseList={exerciseList}
                  shouldLoad={shouldLoad}
                  setShouldLoad={setShouldLoad}
                  postWorkoutResults={postWorkoutResults}
                  fetchFullExerciseList={fetchFullExerciseList}
                  handleDuplicate={handleDuplicate}
                  handleDelete={handleDelete}
                  defaultExerciseList={defaultExerciseList}
                  setDefaultExerciseList={setDefaultExerciseList}
                  fullExerciseList={fullExerciseList}
                  handleSwitchChange={handleSwitchChange}
                />
              </Box>
            </Box>
          </Zoom>
        </>
      );
    } else {
      return (
        <>
          <Box>
            <CircularProgress style={{ color: "black" }} />
          </Box>
        </>
      );
    }
  }
};

export default WorkoutSet;
