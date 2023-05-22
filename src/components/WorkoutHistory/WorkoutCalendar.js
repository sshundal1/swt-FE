import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import ExerciseResultsDialog from "./ExerciseResultsDialog";

//current unused, deprecated

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(props.day.date());

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🏋️‍♂️" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

ServerDay.propTypes = {
  /**
   * The date to show.
   */
  day: PropTypes.object.isRequired,
  highlightedDays: PropTypes.arrayOf(PropTypes.number),
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,
};

export default function WorkoutCalendar() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const [pastWorkout, setPastWorkout] = useState("");
  const [chosenDate, setChosenDate] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getWorkoutInfo = async (date) => {
    fetch(
      process.env.REACT_APP_AWS_MUSCLE_LINK + `/results?date=${date}&flag=day`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPastWorkout(data);
      });
  };

  const fetchWorkoutDaysInMonth = async (date) => {
    fetch(
      process.env.REACT_APP_AWS_MUSCLE_LINK +
        `/results?date=${date}&flag=month`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setHighlightedDays(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let year = initialValue.year();
    let month = initialValue.month() + 1;
    let day = initialValue.date();
    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;
    fetchWorkoutDaysInMonth(`${year}-${month}-${day}`);
  }, []);

  const handleMonthChange = (date) => {
    setIsLoading(true);
    setHighlightedDays([]);
    let year = date.year();
    let month = date.month() + 1;
    let day = date.date();
    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;
    fetchWorkoutDaysInMonth(`${year}-${month}-${day}`);
  };

  const handleCurChange = (date) => {
    let year = date.year();
    let month = date.month() + 1;
    let day = date.date();
    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    let dayOfWeek = date.day();

    getWorkoutInfo(`${year}-${month}-${day}`);
    setChosenDate(
      `${days[dayOfWeek]}, ${months[date.month()]} ${date.date()} ${year}`
    );
    setOpen(true);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignContent="center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            loading={isLoading}
            onChange={handleCurChange}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
          />
        </LocalizationProvider>
      </Box>
      <ExerciseResultsDialog
        workout={pastWorkout}
        chosenDate={chosenDate}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}
