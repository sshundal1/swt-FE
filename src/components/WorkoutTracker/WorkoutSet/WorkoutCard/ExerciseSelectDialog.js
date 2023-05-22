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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExerciseSelectDialog({
  setUserWorkoutLog,
  userWorkoutLog,
  cardNumber,
  exerciseList,
  editButtonSelect,
  fetchFullExerciseList,
  defaultExerciseList,
  fullExerciseList,
  useCachedExercises,
  handleSwitchChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (inputVal) => {
    userWorkoutLog[cardNumber]["exercise_name"] = inputVal;
    userWorkoutLog[cardNumber]["exercise_info"] = exerciseList[inputVal];
    setUserWorkoutLog({ ...userWorkoutLog });
    handleClose();
  };

  var exerciseListItems = [[]];
  const [exerciseCacheList, setExerciseCacheList] = useState([[]]);

  let count = 0;
  let index = 0;
  const { getInputProps, groupedOptions, focused, inputValue } =
    useAutocomplete({
      id: "use-autocomplete-demo",
      options: Object.keys(exerciseList),
      getOptionLabel: (option) => option,
      clearOnBlur: false,
    });

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
    for (const exercise_name in exerciseList) {
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

  useEffect(() => {
    //hacky fix to deal w/ keep variable set
    if (focused && exerciseListItems.length > 0) {
      setExerciseCacheList(exerciseListItems);
    }
  }, [focused, exerciseListItems]);

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
                fontFamily="Lato"
                fontSize={{ xs: 0, sm: 24 }}
                fontWeight={200}
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
          {exerciseListItems.map((value) => {
            return (
              <Stack direction={{ xs: "column", sm: "row" }}>
                {value.map((exercise_name, index) => {
                  return (
                    <>
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
                          secondary={`Muscle Target: ${exerciseList[exercise_name]["muscleTarget"]}`}
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
                          src={exerciseList[exercise_name]["gif_url"]}
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
