import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { IconButton } from "@mui/material";
import GifIcon from "@mui/icons-material/Gif";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GifSlider({ exerciseName, exerciseList }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="gif" size="small" onClick={handleClickOpen}>
        <GifIcon fontSize="large" style={{ color: "black" }} />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        justify-content="center"
        align="center"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <img
              src={exerciseList[exerciseName]["gif_url"]}
              alt="new"
              width="100%"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            display="flex"
            justify-content="center"
            align="center"
            onClick={handleClose}
            sx={{ color: "black", fontFamily: "Noto Sans", fontSize: "15px" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
