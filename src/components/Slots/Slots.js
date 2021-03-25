import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSlots,
  deleteSlot,
  updateSlot,
  resetSlots,
  getCoaches,
  resetCoach,
  addSlot,
} from "../../redux/actions";
import Input from "../Input/Input";
import CRUDButtons from "../buttons/CRUDButtons/CRUDButtons";
import { formattedDate, unformattedDate } from "../formattedDate/formattedDate";
import "./slots.css";
import styles from "../MainStyles/mainStyles.module.css";

const Slots = () => {
  const [pickedDate, setPickedDate] = useState(new Date());

  const dispatch = useDispatch();

  const slots = useSelector((state) => state.slots.data);
  const [slot, setUpdateSlot] = useState({});
  const [slotToDelete, setSlotToDelete] = useState({});

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

  // FORM

  const [isCreateButtonDisabled, setCreateButtonDisabling] = useState(true);
  const [isDeleteButtonDisabled, setDeleteButtonDisabling] = useState(true);
  const [isUpdateButtonDisabling, setUpdateButtonDisabling] = useState(true);

  const [isCreateButtonVisible, setCreateButtonVisibility] = useState(true);
  const [isDeleteButtonVisible, setDeleteButtonVisibility] = useState(false);
  const [isUpdateButtonVisible, setUpdateButtonVisibility] = useState(false);

  const initialInputs = {
    coachId: {
      name: "coachId",
      value: "",
    },
    date: {
      name: "date",
      value: "",
      error: "",
    },
    startTime: {
      name: "startTime",
      value: "",
      error: "",
    },
    endTime: {
      name: "endTime",
      value: "",
      error: "",
    },
  };

  const [inputs, setInputs] = useState({ ...initialInputs });

  const initialFormState = () => {
    setCreateButtonDisabling(true);
    setCreateButtonVisibility(true);
    setDeleteButtonVisibility(false);
    setUpdateButtonVisibility(false);
    setUpdateSlot({});
    setSlotToDelete({});
    setInputs((state) => ({ ...initialInputs }));
  };

  const inputHandler = (e) => {
    setInputs((state) => {
      let new_state = { ...state };
      new_state[e.target.name].value = e.target.value;
      new_state[e.target.name].error = "";
      return new_state;
    });
    if (
      e.target.value &&
      [inputs.date.value, inputs.startTime.value, inputs.endTime.value].every(
        (i) => i.length > 0
      )
    ) {
      setCreateButtonDisabling(false);
      setUpdateButtonDisabling(false);
    }
  };

  const blurHandler = (e) => {
    if (e.target.value.length < 1) {
      const { name } = e.target;
      setInputs((state) => {
        return {
          ...state,
          [name]: {
            ...state[name],
            error: "Empty field",
          },
        };
      });
      setCreateButtonDisabling(true);
    }
  };

  const updateHandler = () => {
    dispatch(
      updateSlot({
        id: slot.id,
        coachId: coachId,
        date: formattedDate(inputs.date.value),
        startTime: inputs.startTime.value,
        endTime: inputs.endTime.value,
      })
    );
    initialFormState();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      addSlot({
        id: slots.sort((a, b) => b.id - a.id)[0].id + 1,
        coachId: coachId,
        date: formattedDate(inputs.date.value),
        startTime: inputs.startTime.value,
        endTime: inputs.endTime.value,
      })
    );
    initialFormState();
    dispatch(getSlots());
    dispatch(resetSlots());
  };

  const deleteHandler = () => {
    console.log(slotToDelete);
    dispatch(deleteSlot(slotToDelete.id));
    initialFormState();
  };

  const setSlot = (date) => {
    return async (e) => {
      const slot = slots.find(
        (slot) => slot.date === formattedDate(date) && slot.coachId === coachId
      );
      if (slot) {
        setCreateButtonVisibility(false);
        setDeleteButtonVisibility(true);
        setUpdateButtonVisibility(true);
        setDeleteButtonDisabling(false);

        setUpdateSlot(slot);
        setSlotToDelete(slot);

        const slotInput = {
          coachId: {
            name: "coachId",
            value: slot.coachId,
          },
          date: {
            name: "date",
            value: unformattedDate(slot.date),
            error: "",
          },
          startTime: {
            name: "startTime",
            value: slot.startTime,
            error: "",
          },
          endTime: {
            name: "endTime",
            value: slot.endTime,
            error: "",
          },
        };
        setInputs((state) => ({ ...slotInput }));
      } else {
        setCreateButtonVisibility(true);
        setCreateButtonDisabling(true);
        setDeleteButtonVisibility(false);
        setUpdateButtonVisibility(false);

        setInputs((state) => ({ ...initialInputs }));
      }
    };
  };

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

    return weekCalendar;
  };

  const formatWeekCalendar = (currentDate) => {
    let compactWeekCalendar = makeWeekCalendar(currentDate);

    let arrayRepresentation = [];
    Object.entries(compactWeekCalendar).forEach(([key, day]) => {
      let dayArray = [];

      let date = new Date(key);
      let dateDay = date.getDate();
      let dateMonth = date.getMonth() + 1;

      dayArray.push(
        <div key={performance.now()} className="day cell">
          {`${dateDay}.${dateMonth}`}
        </div>
      );

      let offset = 24 - Object.entries(day).length;
      if (offset > 0) {
        dayArray.push(<div key={0} className="cell empty"></div>);
      }

      Object.entries(day).forEach(([time, value]) => {
        console.log(time, value);
        let cellClass = value === true ? "active cell" : "cell";
        dayArray.push(<div key={time} className={cellClass}></div>);
      });

      arrayRepresentation.push(
        <div
          key={performance.now()}
          className="dayColumn"
          onClick={setSlot(key)}
        >
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
          {formatWeekCalendar(pickedDate)}
        </div>
      </div>

      <div className="formContainer">
        <form action="" onSubmit={submitHandler}>
          <select
            name={inputs.coachId.name}
            defaultValue={inputs.coachId.value}
            onChange={(e) => setCoachId(Number(e.target.value))}
          >
            {formatCoaches()}
          </select>
          <Input
            key={inputs.date.name + "_slot"}
            onBlur={blurHandler}
            onChange={inputHandler}
            type="date"
            name={inputs.date.name}
            defaultValue={inputs.date.value}
            error={inputs.date?.error}
          />
          <Input
            key={inputs.startTime.name + "_slot"}
            onBlur={blurHandler}
            onChange={inputHandler}
            type="text"
            name={inputs.startTime.name}
            defaultValue={inputs.startTime.value}
            error={inputs.startTime?.error}
          />
          <Input
            key={inputs.endTime.name + "_slot"}
            onBlur={blurHandler}
            onChange={inputHandler}
            type="text"
            name={inputs.endTime.name}
            defaultValue={inputs.endTime.value}
            error={inputs.endTime?.error}
          />
          <CRUDButtons
            blurHandler={blurHandler}
            inputHandler={inputHandler}
            submitHandler={submitHandler}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            isCreateButtonVisible={isCreateButtonVisible}
            isCreateButtonDisabled={isCreateButtonDisabled}
            isUpdateButtonVisible={isUpdateButtonVisible}
            isUpdateButtonDisabling={isUpdateButtonDisabling}
            isDeleteButtonVisible={isDeleteButtonVisible}
            isDeleteButtonDisabled={isDeleteButtonDisabled}
          />
        </form>
      </div>
    </div>
  );
};

export default Slots;
