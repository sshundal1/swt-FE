import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import useAutocomplete from "@mui/base/useAutocomplete";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExerciseSelectDialog({
  setUserWorkoutLog,
  userWorkoutLog,
  cardNumber,
  editButtonSelect,
  fetchFullExerciseList,
  defaultExerciseList,
  setDefaultExerciseList,
  fullExerciseList,
  useCachedExercises,
  handleSwitchChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = useState(false);
  const [userFavoriteChanges, setUserFavoriteChanges] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (inputVal) => {
    userWorkoutLog[cardNumber]["exercise_name"] = inputVal;
    userWorkoutLog[cardNumber]["exercise_info"] = checked
      ? fullExerciseList[inputVal]
      : defaultExerciseList[inputVal];
    setUserWorkoutLog({ ...userWorkoutLog });
    handleClose();
  };

  const [exerciseCacheList, setExerciseCacheList] = useState([[]]);

  let count = 0;
  let index = 0;
  const { getInputProps, groupedOptions, focused, inputValue } =
    useAutocomplete({
      id: "use-autocomplete-demo",
      options: Object.keys(checked ? fullExerciseList : defaultExerciseList),
      clearOnBlur: false,
    });

  function generateExerciseListItems() {
    var exerciseListItems = [[]];
    // solves autoComplete double click issue, groupedOptions goes blank on textfield double click
    if (focused && groupedOptions.length !== 0 && inputValue.length === 0) {
      for (const key in groupedOptions) {
        let exercise_name = groupedOptions[key];
        if (count === 1) {
          exerciseListItems[index].push(exercise_name);
          count = 0;
          index++;
          exerciseListItems[index] = [];
        } else {
          count++;
          exerciseListItems[index].push(exercise_name);
        }
      }
    } else if (
      focused &&
      groupedOptions.length !== 0 &&
      inputValue.length !== 0
    ) {
      for (const key in groupedOptions) {
        let exercise_name = groupedOptions[key];
        if (count === 1) {
          exerciseListItems[index].push(exercise_name);
          count = 0;
          index++;
          exerciseListItems[index] = [];
        } else {
          count++;
          exerciseListItems[index].push(exercise_name);
        }
      }
    } else if (
      focused &&
      groupedOptions.length === 0 &&
      inputValue.length !== 0
    ) {
      exerciseListItems = [];
    } else if (!focused && inputValue.length !== 0) {
      exerciseListItems = exerciseCacheList;
    } else {
      // solves autoComplete double click issue, groupedOptions goes blank on textfield double click
      for (const exercise_name in checked
        ? fullExerciseList
        : defaultExerciseList) {
        if (count === 1) {
          exerciseListItems[index].push(exercise_name);
          count = 0;
          index++;
          exerciseListItems[index] = [];
        } else {
          count++;
          exerciseListItems[index].push(exercise_name);
        }
      }
    }
    return exerciseListItems;
  }

  useEffect(() => {
    //hacky fix to deal w/ keep variable set
    if (focused && generateExerciseListItems.length > 0) {
      setExerciseCacheList(generateExerciseListItems);
    }
  }, [focused]);

  function handleSwitch() {
    if (!checked && Object.keys(fullExerciseList).length === 0) {
      //handles first pull, when hasn't been checked (render hasn't gone thru) and no results yet
      fetchFullExerciseList();
    } else if (!checked) {
      handleSwitchChange(!checked);
    } else {
      handleSwitchChange(!checked);
    }
    setChecked(!checked);
  }

  // if exercise_name exists in defaultList, mark as True
  function checkIfExerciseIsFavorite(exercise_name) {
    if (typeof defaultExerciseList !== "undefined") {
      return exercise_name in defaultExerciseList;
    }
  }

  //handle favorite button press
  function handleFavoriteSwitch(exercise_name, exercise_id) {
    if (exercise_name in userFavoriteChanges) {
      delete userFavoriteChanges[exercise_name];
    } else {
      if (checkIfExerciseIsFavorite(exercise_name)) {
        //check if favorite or not to adjust accordingly (default True equal change to favorite)
        userFavoriteChanges[exercise_name] = {
          exercise_id: exercise_id,
          default: false,
        };
        delete defaultExerciseList[exercise_name];
        setDefaultExerciseList({ ...defaultExerciseList });
      } else {
        userFavoriteChanges[exercise_name] = {
          exercise_id: exercise_id,
          default: true,
        };
        defaultExerciseList[exercise_name] = fullExerciseList[exercise_name];
        setDefaultExerciseList({ ...defaultExerciseList });
      }
    }
    setUserFavoriteChanges({ ...userFavoriteChanges });
  }

  return (
    <>
      {!editButtonSelect && (
        <Button
          sx={{
            borderRadius: 0,
            backgroundColor: "black",
            width: 250,
            height: 35,
            fontFamily: "Noto Sans",
            fontWeight: "700",
            fontSize: 14,
            [`&:hover`]: { backgroundColor: "black" },
          }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Choose Exercise
        </Button>
      )}
      {editButtonSelect && (
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <EditIcon fontSize="small" style={{ color: "black" }} />
        </IconButton>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ bgcolor: "black" }}>
            <Box display="flex" justifyContent="left" width="20%">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="center" width="60%">
              <Typography
                sx={{ flex: 1 }}
                fontFamily="Noto Sans"
                fontSize={{ xs: 0, sm: 24 }}
                fontWeight={400}
                textAlign="center"
              >
                Exercises
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="right"
              width={{ xs: "70%", sm: "20%" }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{ flex: 1 }}
                  fontFamily="Noto Sans"
                  fontSize={{ xs: 15, sm: 15 }}
                >
                  {!checked ? `Show all` : `Show default`}
                </Typography>
                <Switch
                  checked={checked}
                  inputProps={{ "aria-label": "exercise toggle" }}
                  onChange={handleSwitch}
                />
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <Box display="grid">
          <Box display="flex" justifyContent="center">
            <Input
              {...getInputProps()}
              edge="end"
              sx={{
                bgcolor: "white",
                fontFamily: "Noto Sans",
                maxWidth: { xs: "50%" },
                width: { xs: 150, sm: 300 },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Box>
        </Box>
        <List style={{ width: "100%" }}>
          {generateExerciseListItems().map((value) => {
            return (
              <Stack direction={{ xs: "column", sm: "row" }}>
                {value.map((exercise_name, index) => {
                  return (
                    <>
                      <Box alignItems="center">
                        <IconButton
                          onClick={() =>
                            handleFavoriteSwitch(
                              exercise_name,
                              checked
                                ? fullExerciseList[exercise_name]["id"]
                                : defaultExerciseList[exercise_name]["id"]
                            )
                          }
                        >
                          {checkIfExerciseIsFavorite(exercise_name) ? (
                            <StarIcon />
                          ) : (
                            <StarOutlineIcon />
                          )}
                        </IconButton>
                      </Box>
                      <ListItem
                        button
                        width="50%"
                        onClick={() => handleChange(exercise_name)}
                        style={{ width: "100%" }}
                        key={exercise_name}
                        value={exercise_name}
                      >
                        <ListItemText
                          key={exercise_name}
                          value={exercise_name}
                          primary={exercise_name}
                          secondary={`Muscle Target: ${
                            checked
                              ? fullExerciseList[exercise_name]["muscleTarget"]
                              : defaultExerciseList[exercise_name][
                                  "muscleTarget"
                                ]
                          }`}
                          style={{ width: "50%" }}
                          primaryTypographyProps={{
                            fontFamily: "Noto Sans",
                            fontSize: 18,
                            fontWeight: 600,
                            maxWidth: "70%",
                          }}
                          secondaryTypographyProps={{
                            fontFamily: "Noto Sans",
                            fontSize: 12,
                            fontWeight: 400,
                            color: "grey",
                          }}
                        />
                        <img
                          src={
                            checked
                              ? fullExerciseList[exercise_name]["gif_url"]
                              : defaultExerciseList[exercise_name]["gif_url"]
                          }
                          alt="new"
                          width="20%"
                        />
                      </ListItem>
                    </>
                  );
                })}
              </Stack>
            );
          })}
        </List>
      </Dialog>
    </>
  );
}
