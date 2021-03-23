import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSlots,
  deleteSlot,
  resetSlots,
  getCoaches,
  resetCoach,
} from "../../redux/actions";
import "./slots.css";

const Slots = () => {
  const [pickedDate, setPickedDate] = useState(new Date());

  const dispatch = useDispatch();

  const slots = useSelector((state) => state.slots.data);

  useEffect(() => {
    dispatch(getSlots());
    return () => dispatch(resetSlots());
  }, [dispatch]);

  const coaches = useSelector((state) => state.coach.data);
  const [coachId, setCoachId] = useState(1);

  useEffect(() => {
    dispatch(getCoaches());
    return () => dispatch(resetCoach());
  }, []);

  const formatCoaches = () =>
    coaches?.map((coach) => (
      <option key={coach.id} value={coach.id}>
        {coach.firstName} {""}
        {coach.lastName}
      </option>
    ));

  // CALENDAR

  const setDateDetailsToZero = (date) => {
    date.setDate(date.getDate());
    date.setHours(0, 0, 0, 0);

    return date;
  };

  const prev = () => {
    setPickedDate(calculateMondayDate(pickedDate, -1));
  };

  const next = () => {
    setPickedDate(calculateMondayDate(pickedDate, 1));
  };

  const calculateMondayDate = (currentDate, weeksToAdd = 0) => {
    let currentMonday = new Date(currentDate);
    let currentMondayDate = currentDate.getDate() - currentDate.getDay() + 1;
    currentMonday.setDate(currentMondayDate + weeksToAdd * 7);

    return currentMonday;
  };

  const makeWeekSchedule = () => {
    let currentMonday = calculateMondayDate(pickedDate);
    let nextMonday = calculateMondayDate(pickedDate, 1);

    return slots.filter((slot) => {
      if (slot.coachId !== coachId) return false;
      let slotDate = new Date();
      let [month, date, year] = slot.date.split(".");
      slotDate.setFullYear(year, month - 1, date);

      if (currentMonday <= slotDate && nextMonday > slotDate) return true;
      return false;
    });
  };

  const makeWeekCalendar = (currentDate) => {
    let currentMonday = calculateMondayDate(currentDate);
    let coachWeekSchedule = makeWeekSchedule();

    let weekCalendar = {};

    for (let i = 0; i < 7; i++) {
      let date = new Date(currentMonday);

      date.setDate(currentMonday.getDate() + i);
      setDateDetailsToZero(date);

      let times = {};

      let coachDaySchedule = coachWeekSchedule.find((slot) => {
        let slotDate = new Date(slot.date);

        if (
          date.getFullYear() === slotDate.getFullYear() &&
          date.getMonth() === slotDate.getMonth() &&
          date.getDate() === slotDate.getDate()
        ) {
          return slot;
        }
        return undefined;
      });

      Array(24)
        .fill()
        .forEach((value, index) => {
          let currentDateTime = new Date(date);
          currentDateTime.setHours(index);

          if (!coachDaySchedule) {
            times[currentDateTime] = false;
            return;
          }

          let startTime = coachDaySchedule.startTime.split(":")[0];
          let endTime = coachDaySchedule.endTime.split(":")[0];

          if (
            startTime <= currentDateTime.getHours() &&
            endTime >= currentDateTime.getHours()
          )
            times[currentDateTime] = true;
          else times[currentDateTime] = false;
        });
      weekCalendar[date] = times;
    }

    console.log(weekCalendar);

    return weekCalendar;
  };

  const makeCompactWeekCalendar = (currentDate) => {
    let weekCalendar = makeWeekCalendar(currentDate);
    let compactWeekCalendar = {};
    Object.entries(weekCalendar).forEach(([key, value]) => {
      let date = new Date(key);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let compactValue = {};
      Object.entries(value).forEach(([key, value]) => {
        let date = new Date(key);
        compactValue[`${date.getHours()}:00`] = value;
      });
      compactWeekCalendar[`${day}.${month}`] = compactValue;
    });

    return compactWeekCalendar;
  };

  const formatCompactWeekCalendar = (currentDate) => {
    let compactWeekCalendar = makeCompactWeekCalendar(currentDate);
    let arrayRepresentation = [];
    Object.entries(compactWeekCalendar).forEach(([key, day]) => {
      let dayArray = [];
      dayArray.push(
        <div key={key} className="day cell">
          {key}
        </div>
      );

      let offset = 24 - Object.entries(day).length;
      if (offset > 0) {
        dayArray.push(<div key={0} className="cell empty"></div>);
      }

      Object.entries(day).forEach(([time, value]) => {
        let cellClass = value === true ? "active cell" : "cell";
        dayArray.push(<div key={time} className={cellClass}></div>);
      });
      arrayRepresentation.push(
        <div key={key} className="dayColumn">
          {dayArray}
        </div>
      );
    });

    return arrayRepresentation;
  };

  const formatHoursUl = () => {
    var hours = [];

    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }

    return hours?.map((hour) => <li key={hour}>{hour}:00</li>);
  };

  return (
    <div className="slotsContainer">
      <div className="calendarContainer">
        <div className="calendarBtns">
          <button onClick={prev}>Back</button>
          <button onClick={next}>Next</button>
        </div>
        <div className="calendar">
          <ul className="hours">{formatHoursUl()}</ul>
          {formatCompactWeekCalendar(pickedDate)}
        </div>
      </div>

      <div className="formContainer">
        <select
          value={coachId}
          onChange={(e) => setCoachId(Number(e.target.value))}
        >
          {formatCoaches()}
        </select>
      </div>
    </div>
  );
};

export default Slots;