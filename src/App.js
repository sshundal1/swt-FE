import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import "./App.css";

import WorkoutTracker from "./pages/WorkoutTracker";
import Home from "./pages/HomePage";
import Footer from "./components//Footer/Footer";
import MenuAppBar from "./components/Header/MenuAppBar";
import WorkoutHistory from "./pages/WorkoutHistory";

const App = () => {

  return (
    <>
      <Container
        maxWidth={false}
        width="100%"
        height="100%"
        disableGutters
        style={{ backgroundColor: "#EDF2F4", minHeight: "100vh" }}
      >
        <MenuAppBar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="/WorkoutTracker" element={<WorkoutTracker />} />
          <Route path="/WorkoutHistory" element={<WorkoutHistory />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;
