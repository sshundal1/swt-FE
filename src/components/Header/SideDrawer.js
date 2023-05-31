import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";

export default function SideDrawer({ state, setState, toggleDrawer }) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  let master = {
    Home: "/",
    "Workout Tracker": "/WorkoutTracker",
    "Workout History": "/WorkoutHistory"
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {Object.keys(master).map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton LinkComponent={Link} to={master[text]}>
              <ListItemText
                sx={{ color: "black" }}
                primaryTypographyProps={{
                  fontSize: "18px",
                  fontFamily: "Noto Sans",
                }}
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {!isAuthenticated && (
          <ListItem key="Login" disablePadding>
            <ListItemButton onClick={loginWithRedirect}>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  fontFamily: "Noto Sans",
                }}
                primary="Login"
              />
            </ListItemButton>
          </ListItem>
        )}
        {isAuthenticated && (
          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  fontFamily: "Noto Sans",
                }}
                primary="Logout"
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </>
  );
}
