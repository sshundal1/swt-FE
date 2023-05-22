import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

export default function MuscleList({ setSelectedMuscleGroups }) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setSelectedMuscleGroups(newChecked.join(" "));
  };

  return (
    <List dense sx={{ bgcolor: "background.paper" }}>
      {["Biceps", "Back", "Chest", "Core", "Legs", "Shoulders", "Triceps"].map(
        (value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <>
              <ListItem
                key={value}
                disablePadding
                width="100%"
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    onClick={handleToggle(value)}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)}>
                  <ListItemText
                    disableTypography
                    id={labelId}
                    primary={`${value}`}
                    sx={{
                      fontFamily: "Noto Sans",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          );
        }
      )}
    </List>
  );
}
