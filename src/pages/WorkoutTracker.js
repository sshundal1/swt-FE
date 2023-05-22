import { Box } from "@mui/material";
import React, { useState } from "react";

import WorkoutSet from "../components/WorkoutTracker/WorkoutSet";
import WorkoutIntro from "../components/WorkoutTracker/WorkoutIntro";
import { useAuth0 } from "@auth0/auth0-react";

import Zoom from "@mui/material/Zoom";

const WorkoutTracker = () => {
  const [loadWorkoutRepCards, setLoadWorkoutRepCards] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);
  const [getExerciseList, setGetExerciseList] = useState([]);
  const [defaultExerciseList, setDefaultExerciseList] = useState([]);
  const [fullExerciseList, setFullExerciseList] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState("");

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const defaultExerciseListURL =
    process.env.REACT_APP_AWS_MUSCLE_LINK +
    "/exercises/?muscle=" +
    encodeURIComponent(selectedMuscleGroups) +
    "&default=True";

  //TO-DO: combine the bottom 2 into one function
  const fetchDefaultExerciseList = async () => {
    fetch(defaultExerciseListURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExerciseList(data);
        setDefaultExerciseList(data);
        setApiLoading(false);
      });
  };

  const fullExerciseListURL =
    process.env.REACT_APP_AWS_MUSCLE_LINK +
    "/exercises/?muscle=" +
    encodeURIComponent(selectedMuscleGroups) +
    "&default=False";

  const fetchFullExerciseList = async () => {
    fetch(fullExerciseListURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExerciseList(data);
        setFullExerciseList(data);
        setApiLoading(false);
      });
  };

  return (
    isAuthenticated && (
      <Zoom in={true}>
        <Box
          justify-content="center"
          align="center"
          minHeight="500px"
          maxWidth="100%"
          paddingTop={5}
          paddingBottom={12}
        >
          <WorkoutIntro
            shouldLoad={!loadWorkoutRepCards}
            setShouldLoad={setLoadWorkoutRepCards}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
            getExerciseList={getExerciseList}
            setGetExerciseList={setGetExerciseList}
            apiLoading={apiLoading}
            setApiLoading={setApiLoading}
            selectedMuscleGroups={selectedMuscleGroups}
            setSelectedMuscleGroups={setSelectedMuscleGroups}
            fetchDefaultExerciseList={fetchDefaultExerciseList}
          />
          <WorkoutSet
            shouldLoad={loadWorkoutRepCards}
            setShouldLoad={setLoadWorkoutRepCards}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
            apiLoading={apiLoading}
            fetchFullExerciseList={fetchFullExerciseList}
            defaultExerciseList={defaultExerciseList}
            fullExerciseList={fullExerciseList}
          />
        </Box>
      </Zoom>
    )
  );
};

export default WorkoutTracker;
