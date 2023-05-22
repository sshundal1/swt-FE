import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import SideDrawer from "./SideDrawer";

export default function MenuAppBar({ isAuthenticated, user }) {
  const [state, setState] = React.useState({ right: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#00171F" }}>
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            <Typography variant="subtitle1" fontFamily="Lato">Simple Workout Tracker</Typography>
          </Button>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("right", true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideDrawer
        state={state}
        setState={setState}
        toggleDrawer={toggleDrawer}
      />
    </Box>
  );
}
