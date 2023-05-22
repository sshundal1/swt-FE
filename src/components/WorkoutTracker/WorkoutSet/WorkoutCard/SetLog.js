import React, { useRef } from "react";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";

// to rid of the scroll on numbers

const SetLog = ({
  rowID,
  cardNumber,
  userWorkoutLog,
  setUserWorkoutLog,
  handleDelete,
}) => {
  const lbsValueRef = useRef(0);
  const repsValueRef = useRef(0);

  function onTextChange(category) {
    if (category === "lbs") {
      userWorkoutLog[cardNumber]["set_stats"][rowID][category] =
        lbsValueRef.current.value;
    } else {
      userWorkoutLog[cardNumber]["set_stats"][rowID][category] =
        repsValueRef.current.value;
    }
    setUserWorkoutLog({ ...userWorkoutLog });
  }

  return (
    <>
      <Box paddingTop={2}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={2} md={2}>
            <Stack
              direction="row"
              alignItems="flex-end"
              justifyContent="center"
            >
              <Typography
                fontSize={24}
                fontFamily="Noto Sans"
                fontWeight={400}
                color="black"
              >
                {rowID}
              </Typography>
              <Typography
                fontSize={12}
                fontFamily="Noto Sans"
                color="grey"
                fontWeight={400}
              >
                {`/${
                  Object.keys(userWorkoutLog[cardNumber]["set_stats"]).length
                }`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2} md={2}></Grid>
          <Grid item xs={3} md={3}>
            <TextField
              id="outlined-number"
              type="number"
              value={userWorkoutLog[cardNumber]["set_stats"][rowID]["lbs"]}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {
                  fontSize: 18,
                  height: "0px",
                  textAlign: "center",
                  fontFamily: "Noto Sans",
                },
              }}
              inputRef={lbsValueRef}
              onChange={() => onTextChange("lbs")}
              sx={{
                width: "80%",
                [`& fieldset`]: {
                  borderRadius: 1,
                  borderWidth: 2,
                  borderColor: "#00171F",
                },
              }}
            />
          </Grid>
          <Grid item xs={1} md={1}></Grid>
          <Grid item xs={3} md={3}>
            <TextField
              id="outlined-number"
              type="number"
              className="WhiteBorderTextField"
              value={userWorkoutLog[cardNumber]["set_stats"][rowID]["reps"]}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {
                  color: "black",
                  fontSize: 18,
                  height: "0px",
                  textAlign: "center",
                  fontFamily: "Noto Sans",
                },
              }}
              inputRef={repsValueRef}
              onChange={() => onTextChange("reps")}
              sx={{
                width: "80%",
                [`& fieldset`]: {
                  borderRadius: 1,
                  borderWidth: 2,
                  borderColor: "#00171F",
                },
              }}
              fontFamily="Lato"
            />
          </Grid>
          <Grid item xs={1} md={1}>
            <IconButton onClick={() => handleDelete(rowID)}>
              <DeleteIcon style={{color: 'black'}} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SetLog;
