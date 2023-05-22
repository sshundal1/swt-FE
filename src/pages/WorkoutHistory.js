import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";

import "react-calendar/dist/Calendar.css";
import WorkoutCalendar from "../components/WorkoutHistory/WorkoutCalendar";

const WorkoutHistory = () => {
  return (
    <Zoom in={true}>
      <Box
        justifyContent="center"
        align="center"
        minHeight="500px"
        maxWidth="100%"
        paddingTop={5}
        paddingBottom={12}
      >
        <Box
          display="grid"
          bgcolor="#FFFFFF"
          width="400px"
          maxWidth="90vw"
          gap="10px"
          minHeight="300px"
          sx={{
            boxShadow: 2,
            borderRadius: 3,
            borderColor: "#8e936d",
            p: 1,
          }}
          paddingBottom={10}
        >
          <Typography
            variant="h5"
            display="flex"
            justifyContent="center"
            alignContent="center"
            textAlign="center"
            paddingBottom={1}
            paddingTop={1}
            fontFamily="Noto Sans"
            fontWeight={700}
          >
            Workout Calendar
          </Typography>
          <WorkoutCalendar />
        </Box>
      </Box>
    </Zoom>
  );
};

export default WorkoutHistory;
