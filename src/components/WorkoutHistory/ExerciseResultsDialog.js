import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CardStats from "./CardStats";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExerciseResultsDialog({
  workout,
  chosenDate,
  open,
  handleClose,
}) {
  const [editMode, setEditMode] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const getSetIDs = () => {
    const origObj = {};

    Object.keys(workout).map((workout_id) =>
      Object.keys(workout[workout_id]).map((card, index) =>
        Object.keys(workout[workout_id][card]["set_stats"]).map(
          (set, index) =>
            (origObj[workout[workout_id][card]["set_stats"][set]["set_id"]] = {
              lbs: "",
              reps: "",
            })
        )
      )
    );
    return origObj;
  };

  const [editChanges, setEditChanges] = useState(getSetIDs);
  const postSetChanges = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
      body: JSON.stringify({ ...editChanges }),
    };
    fetch(process.env.REACT_APP_AWS_MUSCLE_LINK + `/sets`, requestOptions)
      .then((response) => response.json())
      .then((data) => setEditMode(false));
  };

  const handleChange = () => {
    setEditMode(!editMode);
    setEditChanges(getSetIDs);
  };
  return (
    <Box justifyContent="center" align="center">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        align="center"
        sx={{
          "& .MuiDialog-container": {
            // have to set the root for the paper component,
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",
            },
          },
        }}
      >
        <DialogTitle
          display="flex"
          justifyContent="space-between"
          paddingTop={4}
        >
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography
            variant="h4"
            display="flex"
            justifyContent="center"
            fontFamily="Noto Sans"
            fontWeight={800}
          >
            Workout
          </Typography>
          <IconButton aria-label="close" onClick={handleChange}>
            <Typography
              display="flex"
              fontFamily="Noto Sans"
              fontWeight={400}
              fontSize={16}
              color="black"
            >
              Edit
            </Typography>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography
              fontSize={14}
              fontWeight="400"
              marginLeft={1}
              display="flex"
              justifyContent="left"
              paddingBottom={1}
              paddingTop={1}
            >
              {chosenDate}
            </Typography>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {Object.keys(workout).map((workout_id) =>
              Object.keys(workout[workout_id]).map((card, index) => (
                <CardStats
                  card={workout[workout_id][card]}
                  cardNumber={index}
                  editMode={editMode}
                  editChanges={editChanges}
                  setEditChanges={setEditChanges}
                ></CardStats>
              ))
            )}
          </DialogContentText>
        </DialogContent>
        {editMode && (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              <Typography
                display="flex"
                fontFamily="Noto Sans"
                fontWeight={400}
                fontSize={16}
                color="black"
                onClick={postSetChanges}
              >
                Save Changes
              </Typography>
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
}
