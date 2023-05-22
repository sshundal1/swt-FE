import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      bgcolor="#00171F"
      height="50px"
      width="100%"
      sx={{ marginTop: "-50px" }}
    >
      <Typography
        textAlign="center"
        justifyContent="center"
        color="#FFFFFF"
        fontFamily="Lato"
        paddingTop={1}
      >
        simple-workout-tracker™
      </Typography>
    </Box>
  );
};

export default Footer;
