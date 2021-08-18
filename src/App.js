import React from "react";
import "./App.css";

function App() {
  let [startRange, setStartRange] = React.useState("");
  let [endRange, setEndRange] = React.useState("");
  let [date, setDate] = React.useState("");
  let [timeError, setTimeError] = React.useState("");
  let [hours, setHours] = React.useState("");
  let [minutes, setMinutes] = React.useState("");
  let [meetingIntervals, setMeetingIntervals] = React.useState([]);

  const startRangeOnChangeHandler = (e) => {
    setStartRange(e.target.value);
  };

  const endRangeOnChangeHandler = (e) => {
    setEndRange(e.target.value);
  };

  const dateOnChangeHandler = (e) => {
    setDate(e.target.value);
  };

  const hoursOnChangeHandler = (e) => {
    setHours(e.target.value);
  };

  const minutesOnChangeHandler = (e) => {
    setMinutes(e.target.value);
  };

  const onKeyDownHandler = (e) => {
    e.key === "e" && e.preventDefault();
  };

  const buttonOnClickHandler = () => {
    console.log(startRange);
    console.log(endRange);
    console.log(date);

    let startRangeArray = startRange.split(":");
    startRangeArray.map((int) => +int);
    let startRangeinMinutes =
      Number(startRangeArray[0] * 60) + Number(startRangeArray[1]);

    let endRangeArray = endRange.split(":");
    endRangeArray.map((int) => +int);
    let endRangeinMinutes =
      Number(endRangeArray[0] * 60) + Number(endRangeArray[1]);

    /*
    console.log(Number(startRangeArray[0] * 60));
    console.log(startRangeinMinutes);

    console.log(endRangeArray);
    console.log(endRangeinMinutes);
    */

    if (startRangeinMinutes > endRangeinMinutes) {
      setTimeError("Ending time must occur after start time!");
      return;
    }

    setTimeError("");

    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetingDate: date.replace(/-|\s/g, ""),
        meetingStartRangeInMinutes: startRangeinMinutes,
        meetingEndRangeInMinutes: endRangeinMinutes,
        meetingDurationMinutes: Number(minutes),
        meetingDurationHoursInMinutes: Number(+hours * 60),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log(json[0]);
        console.log(json.length);
        setMeetingIntervals(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formOnSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className="form">
        <form onSubmit={formOnSubmitHandler}>
          <div className="left">
            <label htmlFor="startRange" className="labelBlock">
              {" "}
              start time :{" "}
            </label>
            <input
              className="size"
              type="time"
              id="startRange"
              value={startRange}
              onChange={startRangeOnChangeHandler}
            />
          </div>
          <div className="left">
            <label htmlFor="endRange" className="labelBlock">
              {" "}
              end time :{" "}
            </label>
            <input
              type="time"
              id="endRange"
              value={endRange}
              onChange={endRangeOnChangeHandler}
            />
          </div>
          <div className="left">
            <label htmlFor="date" className="labelBlock">
              {" "}
              date :{" "}
            </label>
            <input
              className="dateSize"
              type="date"
              id="date"
              value={date}
              onChange={dateOnChangeHandler}
            />
          </div>
          <div className="left">
            <label htmlFor="hours" className="labelBlock">
              {" "}
              hrs:{" "}
            </label>
            <input
              className="durationSize"
              type="number"
              id="hours"
              min="0"
              max="8"
              maxLength="2"
              onKeyDown={onKeyDownHandler}
              value={hours}
              onChange={hoursOnChangeHandler}
            />
          </div>
          <div className="left">
            <label htmlFor="minutes" className="labelBlock">
              {" "}
              min:{" "}
            </label>
            <input
              className="durationSize"
              type="number"
              id="minutes"
              min="15"
              max="59"
              maxLength="2"
              onKeyDown={onKeyDownHandler}
              value={minutes}
              onChange={minutesOnChangeHandler}
            />
          </div>

          <button type="submit" onClick={buttonOnClickHandler}>
            Check Availability
          </button>
          <div>{timeError}</div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default App;
