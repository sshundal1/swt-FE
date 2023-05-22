import React from "react";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";

const CardStats = ({
  card,
  cardNumber,
  editMode,
  editChanges,
  setEditChanges,
}) => {
  function handleTextChange(event) {
    editChanges[event.target.id][event.target.name] = event.target.value;
    setEditChanges({ ...editChanges });
  }

  return (
    <Box>
      {
        <Typography
          fontFamily="Lato"
          fontSize={16}
          fontWeight="700"
          textAlign="left"
          marginLeft={1}
          display="flex"
          justifyContent="left"
          color="black"
          paddingBottom={1}
          paddingTop={1}
        >
          {card["exercise_name"]}
        </Typography>
      }
      {Object.keys(card["set_stats"]).map((set_number) => (
        <Box display="flex">
          <Typography
            fontFamily="Noto Sans"
            display="flex"
            justifyContent="left"
            alignContent="left"
            textAlign="left"
            marginLeft={1}
            fontSize={14}
          >
            {set_number}
          </Typography>
          {!editMode && (
            <Typography
              fontFamily="Noto Sans"
              display="flex"
              justifyContent="left"
              alignContent="left"
              textAlign="left"
              marginLeft={1}
              fontSize={14}
            >
              {card["set_stats"][set_number]["lbs"]} lb x{" "}
              {card["set_stats"][set_number]["reps"]} reps
            </Typography>
          )}
          {editMode && (
            <Typography
              fontFamily="Noto Sans"
              display="flex"
              justifyContent="left"
              alignContent="left"
              textAlign="left"
              marginLeft={1}
              fontSize={14}
              gap={1}
            >
              <TextField
                name="lbs"
                id={card["set_stats"][set_number]["set_id"]}
                type="number"
                className="WhiteBorderTextField"
                placeholder={card["set_stats"][set_number]["lbs"]}
                onChange={handleTextChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    color: "gray",
                    fontSize: 14,
                    height: "20px",
                    textAlign: "center",
                    fontFamily: "Noto Sans",
                    padding: "0",
                  },
                }}
                sx={{
                  width: "30px",
                  height: "10px",
                  [`& fieldset`]: {
                    borderRadius: 1,
                    borderWidth: 1,
                    borderColor: "gray",
                  },
                }}
                fontFamily="Noto Sans"
              />
              lb x
              <TextField
                name="reps"
                id={card["set_stats"][set_number]["set_id"]}
                type="number"
                className="WhiteBorderTextField"
                placeholder={card["set_stats"][set_number]["reps"]}
                onChange={handleTextChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    color: "gray",
                    fontSize: 14,
                    height: "20px",
                    textAlign: "center",
                    fontFamily: "Noto Sans",
                    padding: "0",
                  },
                }}
                sx={{
                  width: "30px",
                  height: "10px",
                  [`& fieldset`]: {
                    borderRadius: 1,
                    borderWidth: 1,
                    borderColor: "gray",
                  },
                }}
                fontFamily="Noto Sans"
              />
              reps
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CardStats;
