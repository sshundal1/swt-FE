import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Zoom from "@mui/material/Zoom";

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <Zoom in={true}>
      <Grid
        minHeight="80vh"
        paddingTop={5}
        paddingBottom={5}
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          display="grid"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Typography
            variant="h2"
            fontFamily="sans-serif"
            fontWeight="boldest"
            paddingBottom={5}
          >
            Simple Workout Tracker
          </Typography>
          <Grid item xs={12} height="50px" overflow="hidden">
            <div className="text-wrapper">
              <Typography variant="h4" height="50px">
                Quickly Log Workouts
              </Typography>
              <Typography variant="h4" height="50px">
                View Past Sessions
              </Typography>
              <Typography variant="h4" height="50px">
                Track Your Progression
              </Typography>
              <Typography variant="h4" height="50px">
                Improve Your Health
              </Typography>
              <Typography variant="h4" height="50px">
                Simple Interface
              </Typography>
            </div>
          </Grid>
          <Typography
            fontSize={20}
            fontFamily="Noto-sans"
            paddingTop={3}
            paddingBottom={2}
          >
            {isAuthenticated && (
              <Button
                variant="contained"
                color="error"
                style={{ width: 300, height: 50 }}
                sx={{
                  borderRadius: 1,
                  backgroundColor: "#00171F",
                  [`&:hover`]: { backgroundColor: "#00171F" },
                }}
                component={Link}
                to={"/WorkoutTracker"}
              >
                <Typography fontFamily="Noto Sans">Start Workout</Typography>
              </Button>
            )}
            {!isAuthenticated && (
              <Button
                onClick={loginWithRedirect}
                variant="contained"
                color="error"
                style={{ width: 300, height: 50 }}
                sx={{
                  borderRadius: 1,
                  backgroundColor: "#00171F",
                  [`&:hover`]: { backgroundColor: "#00171F" },
                }}
              >
                <Typography fontFamily="Noto Sans">Sign Up / Login</Typography>
              </Button>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Zoom>
  );
};

export default Home;
