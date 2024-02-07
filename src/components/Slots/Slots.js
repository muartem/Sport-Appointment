import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formattedDate, formattedTime } from "../formattedDate/formattedDate";
import {
  addSlots,
  deleteSlots,
  getSlots,
  resetSlots,
} from "../../redux/Ducks/Slots.duck";
import { getCoaches, resetCoach } from "../../redux/Ducks/Coaches.duck";

import "./slots.css";
import styles from "../../assets/styles/mainStyles.module.css";

const Slots = () => {
  const [pickedDate, setPickedDate] = useState(new Date());

  console.log(pickedDate)

  const dispatch = useDispatch();

  const slots = useSelector((state) => state.slots.data);

  useEffect(() => {
    dispatch(getSlots());
    dispatch(getCoaches());
    return () => {
      dispatch(resetSlots());
      dispatch(resetCoach());
    };
  }, [dispatch]);

  // COACHES

  const coaches = useSelector((state) => state.coach.data);

  const [selectedCoachIndex, setCoachIndex] = useState(0);

  const formatCoaches = () =>
    coaches?.map((coach, index) => (
      <option key={coach.id} value={index}>
        {coach.firstName} {""}
        {coach.lastName}
      </option>
    ));

  // ACTIONS

  const setSlot = (slotArr) => {
    let slotArrDelete = [];
    let slotArrAdd = [];

    slotArr.forEach((date) => {
      let currDate = date.split("/")[0];
      let startTime = date.split("/")[1];

      const slot = slots.find(
        (slot) =>
          slot.dateStart === formattedDate(currDate) &&
          slot.timeStart === formattedTime(startTime) &&
          slot.coachId === coaches[selectedCoachIndex]?.id
      );
      if (slot) {
        slotArrDelete.push(slot.id);
      } else {
        let slot = {
          id: 0,
          coachId: coaches[selectedCoachIndex]?.id,
          dateStart: formattedDate(currDate),
          timeStart: formattedTime(startTime),
          duration: "01:00",
        };
        slotArrAdd.push(slot);
      }
    });

    console.log(slotArrAdd);
    console.log(slotArrDelete);

    if (slotArrDelete.length > 0) dispatch(deleteSlots(slotArrDelete));
    if (slotArrAdd.length > 0) dispatch(addSlots(slotArrAdd));

    return () => dispatch(resetSlots());
  };

  // CALENDAR

  const setDateDetailsToZero = (date) => {
    date.setDate(date.getDate());
    date.setHours(0, 0, 0, 0);

    return date;
  };

  // CALENDAR NAVIGATION

  const calculateMondayDate = (currentDate, weeksToAdd = 0) => {
    let currentMonday = new Date(currentDate);
    let currentMondayDate = currentDate.getDate() - currentDate.getDay() + 1;
    currentMonday.setDate(currentMondayDate + weeksToAdd * 7);

    return currentMonday;
  };

  const prev = () => {
    setPickedDate((prevState) => calculateMondayDate(prevState, -1));
  };

  const next = () => {
    setPickedDate((prevState) => calculateMondayDate(prevState, 1));
  };

  const today = () => {
    setPickedDate(calculateMondayDate(new Date(), 0));
  };

  // CALENDAR CREATION

  const makeWeekSchedule = () => {
    let currentMonday = calculateMondayDate(pickedDate);
    let nextMonday = calculateMondayDate(pickedDate, 1);

    return slots.filter((slot) => {
      if (slot.coachId !== coaches[selectedCoachIndex]?.id) return false;
      let slotDate = new Date();
      let [month, date, year] = slot.dateStart.split(".");
      slotDate.setFullYear(year, month - 1, date);

      return currentMonday <= slotDate && nextMonday > slotDate;
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

      let coachDaySchedule = coachWeekSchedule.filter((slot) => {
        let slotDate = new Date(slot.dateStart);

        if (
          date.getFullYear() === slotDate.getFullYear() &&
          date.getMonth() === slotDate.getMonth() &&
          date.getDate() === slotDate.getDate()
        ) {
          return slot;
        }
        return undefined;
      });

      let times = Array(24).fill(false);

      coachDaySchedule.forEach((slot) => {
        let time = Number(slot.timeStart.split(":")[0]);
        if (time && time < times.length) {
          times[time] = true;
        }
      });

      weekCalendar[date] = times;
    }

    return weekCalendar;
  };

  // CALENDAR DISPLAY

  let slotArr = [];

  const formatWeekCalendar = (currentDate) => {
    let compactWeekCalendar = makeWeekCalendar(currentDate);

    let arrayRepresentation = [];
    Object.entries(compactWeekCalendar).forEach(([key, day]) => {
      let dayArray = [];

      let date = new Date(key);
      let dateDay = date.getDate();
      let dateMonth = date.getMonth() + 1;

      dayArray.push(
        <div key={key} className="day cell">
          {`${dateDay}.${dateMonth}`}
        </div>
      );

      let offset = 24 - day.length;
      if (offset > 0) {
        dayArray.push(<div key={0} className="cell empty" />);
      }

      day.forEach((value, index) => {
        let cellClass = value === true ? "active cell" : "cell";

        dayArray.push(
          <div
            key={index}
            onClick={(e) => {
              slotArr.push(`${new Date(key)}/${index}:00`);
              e.target.style.background = "#fff";
            }}
            className={cellClass}
          />
        );
      });

      arrayRepresentation.push(
        <div key={performance.now()} className="dayColumn">
          {dayArray}
        </div>
      );
    });
    return arrayRepresentation;
  };

  const formatHoursUl = () => {
    let hours = [];

    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }

    return hours?.map((hour) => <li key={hour}>{hour}:00</li>);
  };

  return (
    <div className="slotsContainer">
      <div className="calendarContainer">
        <div className="calendarBtns">
          <button onClick={prev}>Back</button>
          <button onClick={today}>Today</button>
          <button onClick={next}>Next</button>
        </div>
        <div className="calendar">
          <ul className="hours">{formatHoursUl()}</ul>
          {formatWeekCalendar(pickedDate)}
        </div>
      </div>

      <div className="formContainer">
        <select
          defaultValue={selectedCoachIndex}
          onChange={(e) => setCoachIndex(Number(e.target.value))}
        >
          {formatCoaches()}
        </select>
        <div className={styles.btnContainer}>
          <button onClick={() => setSlot(slotArr)} className={styles.addBtn}>
            <p className={styles.addBtnText}>Add</p>
          </button>
          <button onClick={() => setSlot(slotArr)} className={styles.addBtn}>
            <p className={styles.addBtnText}>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slots;
