import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoach, getCoaches, resetCoach } from "../../redux/actions";

import Input from "../Input/Input";

import styles from "../MainStyles/mainStyles.module.css";

const Coaches = () => {
  const dispatch = useDispatch();

  const coaches = useSelector((state) => state.coach.data);

  const [buttonState, setButtonState] = useState(true);

  const initialInputs = {
    firstName: {
      name: "firstName",
      value: "",
      error: "",
    },
    lastName: {
      name: "lastName",
      value: "",
      error: "",
    },
    birthDate: {
      name: "birthDate",
      value: "",
      error: "",
    },
    description: {
      name: "description",
      value: "",
      error: "",
    },
    phoneNumber: {
      name: "phoneNumber",
      value: "",
      error: "",
    },
  };

  const [inputs, setInputs] = useState({...initialInputs});

  useEffect(() => {
    dispatch(getCoaches());
    return () => dispatch(resetCoach());
  }, []);

  const inputHandler = (e) => {
    setInputs((state) => {
      let new_state = {...state};
      new_state[e.target.name].value = e.target.value;
      new_state[e.target.name].error = "";
      return new_state;
    });
    if (e.target.value && [inputs.phoneNumber.value, inputs.lastName.value, inputs.firstName.value, inputs.description.value].every((i) => i.length > 0)) {
      setButtonState(false);
    }
  };

  const blurHandler = (e) => {
    if (e.target.value.length < 1) {
      setInputs((state) => {
        let new_state = {...state};
        new_state[e.target.name].error = "Empty field";
        return new_state;
      });
      setButtonState(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addCoach({
        id: coaches.sort((a, b) => b.id - a.id)[0].id + 1,
        firstName: inputs.firstName.value,
        lastName: inputs.lastName.value,
        birthDate: inputs.birthDate.value,
        description: inputs.description.value,
        phoneNumber: inputs.phoneNumber.value,
      })
    );
    setInputs((state) => ({...initialInputs}));
  };

  const addForm = (e) => {
    setButtonState(true);
    setInputs((state) => ({...initialInputs}));
  };

  const formatCoaches = () =>
    coaches?.map((coach) => (
      <p key={coach.id}>
        {coach.firstName} {""}
        {coach.lastName}
      </p>
    ));

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <button onClick={addForm} className={styles.addBtn}>
          <p className={styles.addBtnText}>Add</p>
          <div className={styles.addBtnPlus}>+</div>
        </button>
        <div className={styles.resultList}>{formatCoaches()}</div>
      </div>

      <div className={styles.rightContainer}>
          <form action="" onSubmit={submitHandler}>
            <Input
              onBlur={blurHandler}
              onChange={inputHandler}
              type="text"
              name={inputs.firstName.name}
              error={inputs.firstName?.error}
            />
            <Input
                onBlur={blurHandler}
                onChange={inputHandler}
                type="text"
                name={inputs.lastName.name}
                error={inputs.lastName?.error}
            />
            <Input
                onBlur={blurHandler}
                onChange={inputHandler}
                type="text"
                name={inputs.description.name}
                error={inputs.description?.error}
            />
            <Input
                onBlur={blurHandler}
                onChange={inputHandler}
                type="date"
                name={inputs.birthDate.name}
                error={inputs.birthDate?.error}
            />
            <Input
                onBlur={blurHandler}
                onChange={inputHandler}
                type="tel"
                name={inputs.phoneNumber.name}
                error={inputs.phoneNumber?.error}
            />
            <div className={styles.btnContainer}>
              <button
                type="submit"
                disabled={buttonState}
                className={styles.addBtn}
              >
                <p className={styles.addBtnText}>Done</p>
              </button>
              <button
                type="reset"
                disabled={buttonState}
                className={styles.addBtn}
              >
                <p className={styles.addBtnText}>Delete</p>
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Coaches;
