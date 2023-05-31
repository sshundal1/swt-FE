import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, IconButton, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Divider from "@mui/material/Divider";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EndWorkoutButton from "./WorkoutCard/EndWorkoutButton";
import ExerciseSelectDialog from "./WorkoutCard/ExerciseSelectDialog";
import ButtonGroup from "@mui/material/ButtonGroup";

import SetLog from "./WorkoutCard/SetLog";
import GifSlider from "./WorkoutCard/GifSlider";

const WorkoutCard = ({
  handleTurnClick,
  cardNumber,
  handleUpdate,
  setRandomVal,
  userWorkoutLog,
  setUserWorkoutLog,
  exerciseList,
  shouldLoad,
  setShouldLoad,
  postWorkoutResults,
  fetchFullExerciseList,
  handleDuplicate,
  handleDelete,
  defaultExerciseList,
  setDefaultExerciseList,
  fullExerciseList,
  handleSwitchChange,
}) => {
  var exerciseListItems = [[]];

  function checkValidityOfWorkout() {
    for (const card in userWorkoutLog) {
      for (const set in userWorkoutLog[card]["set_stats"]) {
        if (
          Object.keys(userWorkoutLog).length === parseInt(card) &&
          userWorkoutLog[card]["exercise_name"] === ""
        ) {
          return false;
        } else if (userWorkoutLog[card]["set_stats"][set]["lbs"] === "") {
          return true;
        } else if (userWorkoutLog[card]["set_stats"][set]["reps"] === "0") {
          return true;
        } else if (userWorkoutLog[card]["set_stats"][set]["reps"] === "") {
          return true;
        }
      }
    }
    return false;
  }

  if (userWorkoutLog[cardNumber]["exercise_name"] === "") {
    return (
      <>
        <Box
          position="relative"
          width="100%"
          display="grid"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            fontFamily="Noto Sans"
            fontSize={20}
            fontWeight={700}
            textAlign="center"
          >
            {" "}
            Exercise Number {cardNumber}
          </Typography>
          <Box display="grid" gap={2}>
            <ExerciseSelectDialog
              setUserWorkoutLog={setUserWorkoutLog}
              userWorkoutLog={userWorkoutLog}
              cardNumber={cardNumber}
              editButtonSelect={false}
              exerciseListItems={exerciseListItems}
              fetchFullExerciseList={fetchFullExerciseList}
              defaultExerciseList={defaultExerciseList}
              setDefaultExerciseList={setDefaultExerciseList}
              fullExerciseList={fullExerciseList}
              handleSwitchChange={handleSwitchChange}
            />
            <EndWorkoutButton
              shouldLoad={shouldLoad}
              setShouldLoad={setShouldLoad}
              postWorkoutResults={postWorkoutResults}
              checkValidityOfWorkout={checkValidityOfWorkout}
              buttonWidth="250px"
              buttonHeight="35px"
            />
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <Box position="relative">
        {
          <Box display="flex" justifyContent="right" paddingTop={0}>
            <Typography
              fontFamily="Noto Sans"
              fontSize={16}
              fontWeight="900"
              textAlign="right"
              marginRight={1}
            >
              Card {cardNumber}
            </Typography>
          </Box>
        }
        {
          <Box display="flex" gap={3} paddingTop={1}>
            <Box display="column" width="70%" justifyContent="left">
              <Typography
                fontFamily="Lato"
                fontSize={25}
                fontWeight="900"
                textAlign="left"
                marginLeft={5}
              >
                {userWorkoutLog[cardNumber]["exercise_name"]}
              </Typography>
              <Typography
                fontFamily="Lato"
                fontSize={12}
                fontWeight="400"
                textAlign="left"
                color="grey"
                marginLeft={5}
              >
                {`Targeted muscle group: ${userWorkoutLog[cardNumber]["exercise_info"]["muscleTarget"]}`}
              </Typography>
            </Box>
            <Box display="flex" width="30%">
              <GifSlider
                exerciseName={userWorkoutLog[cardNumber]["exercise_name"]}
                exerciseList={exerciseList}
              ></GifSlider>
              <ExerciseSelectDialog
                setUserWorkoutLog={setUserWorkoutLog}
                userWorkoutLog={userWorkoutLog}
                cardNumber={cardNumber}
                editButtonSelect={true}
                exerciseListItems={exerciseListItems}
                setDefaultExerciseList={setDefaultExerciseList}
                fetchFullExerciseList={fetchFullExerciseList}
                defaultExerciseList={defaultExerciseList}
                fullExerciseList={fullExerciseList}
                handleSwitchChange={handleSwitchChange}
              />
            </Box>
          </Box>
        }
        <Box paddingTop={3}>
          <Divider variant="middle" />
        </Box>
        <Box position="relative" paddingTop={2}>
          {
            <>
              <Grid container>
                <Grid item xs={2} md={2}>
                  <Typography
                    fontFamily="Noto Sans"
                    fontSize={20}
                    fontWeight="500"
                  >
                    Set
                  </Typography>
                </Grid>
                <Grid item xs={2} md={2}></Grid>
                <Grid item xs={3} md={3}>
                  <Typography
                    fontFamily="Noto Sans"
                    fontSize={20}
                    fontWeight="500"
                  >
                    Weight
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1}></Grid>
                <Grid item xs={3} md={3}>
                  <Typography
                    fontFamily="Noto Sans"
                    fontSize={20}
                    fontWeight="500"
                  >
                    Reps
                  </Typography>
                </Grid>
              </Grid>
              {/* </Stack> */}
            </>
          }
          <Box>
            {Object.keys(userWorkoutLog[cardNumber]["set_stats"]).map(
              (number, index) => (
                <SetLog
                  rowID={number}
                  cardNumber={cardNumber}
                  setRandomVal={setRandomVal}
                  userWorkoutLog={userWorkoutLog}
                  setUserWorkoutLog={setUserWorkoutLog}
                  handleDelete={handleDelete}
                />
              )
            )}
          </Box>
          <Box paddingBottom={2} paddingTop={4}>
            <ButtonGroup>
              <IconButton onClick={handleUpdate}>
                <ControlPointIcon style={{ color: "black" }}></ControlPointIcon>
              </IconButton>
              <IconButton onClick={handleDuplicate}>
                <ContentCopyIcon style={{ color: "black" }}></ContentCopyIcon>
              </IconButton>
            </ButtonGroup>
          </Box>
          {
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginLeft={2}
              marginRight={2}
              paddingTop={1}
            >
              <IconButton
                aria-label="left"
                size="small"
                onClick={() => handleTurnClick("Left")}
              >
                <ArrowLeftIcon sx={{ width: 35, height: 35 }} />
              </IconButton>
              <EndWorkoutButton
                shouldLoad={shouldLoad}
                setShouldLoad={setShouldLoad}
                postWorkoutResults={postWorkoutResults}
                checkValidityOfWorkout={checkValidityOfWorkout}
                buttonWidth="150px"
                buttonHeight="35px"
              />
              <IconButton
                aria-label="right"
                size="small"
                onClick={() => handleTurnClick("Right")}
              >
                <ArrowRightIcon sx={{ width: 35, height: 35 }} />
              </IconButton>
            </Box>
          }
        </Box>
      </Box>
    );
  }
};

export default WorkoutCard;
