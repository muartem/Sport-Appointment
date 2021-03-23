import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoach,
  getCoaches,
  updateCoach,
  deleteCoach,
  resetCoach,
} from "../../redux/actions";
import styles from "../MainStyles/mainStyles.module.css";
import List from "../List/List";
import AddButton from "../buttons/AddButton/AddButton";
import CoachesForm from "./CoachesForm";

const Coaches = () => {
  const dispatch = useDispatch();

  const coaches = useSelector((state) => state.coach.data);
  const [coach, setUpdateCoach] = useState({});

  const [isCreateButtonDisabled, setCreateButtonDisabling] = useState(true);
  const [isDeleteButtonDisabled, setDeleteButtonDisabling] = useState(true);
  const [isUpdateButtonDisabling, setUpdateButtonDisabling] = useState(true);

  const [isCreateButtonVisible, setCreateButtonVisibility] = useState(true);
  const [isDeleteButtonVisible, setDeleteButtonVisibility] = useState(false);
  const [isUpdateButtonVisible, setUpdateButtonVisibility] = useState(false);

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

  const [inputs, setInputs] = useState({ ...initialInputs });

  useEffect(() => {
    dispatch(getCoaches());
    return () => dispatch(resetCoach());
  }, []);

  const initialFormState = () => {
    setCreateButtonDisabling(true);
    setCreateButtonVisibility(true);
    setDeleteButtonVisibility(false);
    setUpdateButtonVisibility(false);
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
      [
        inputs.phoneNumber.value,
        inputs.lastName.value,
        inputs.firstName.value,
        inputs.description.value,
      ].every((i) => i.length > 0)
    ) {
      setCreateButtonDisabling(false);
      setUpdateButtonDisabling(false);
    }
  };

  const blurHandler = (e) => {
    if (e.target.value.length < 1) {
      setInputs((state) => {
        let new_state = { ...state };
        new_state[e.target.name].error = "Empty field";
        return new_state;
      });
      setCreateButtonDisabling(true);
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
    setInputs((state) => ({ ...initialInputs }));
  };

  const updateHandler = () => {
    dispatch(
      updateCoach({
        firstName: inputs.firstName.value,
        lastName: inputs.lastName.value,
        birthDate: inputs.birthDate.value,
        description: inputs.description.value,
        phoneNumber: inputs.phoneNumber.value,
        id: coach.id,
      })
    );
    initialFormState();
  };

  const deleteHandler = () => {
    dispatch(deleteCoach(coach.id));
    initialFormState();
  };

  const addForm = (e) => {
    initialFormState();
  };

  const setCoach = (coachId) => {
    return (e) => {
      setCreateButtonVisibility(false);
      setDeleteButtonVisibility(true);
      setUpdateButtonVisibility(true);
      setDeleteButtonDisabling(false);

      const coach = coaches.find((coach) => coach.id === coachId);
      setUpdateCoach(coach);

      const serviceInput = {
        firstName: {
          name: "firstName",
          value: coach.firstName,
          error: "",
        },
        lastName: {
          name: "lastName",
          value: coach.lastName,
          error: "",
        },
        birthDate: {
          name: "birthDate",
          value: coach.birthDate,
          error: "",
        },
        description: {
          name: "description",
          value: coach.description,
          error: "",
        },
        phoneNumber: {
          name: "phoneNumber",
          value: coach.phoneNumber,
          error: "",
        },
      };
      setInputs((state) => ({ ...serviceInput }));
    };
  };

  const formatCoaches = () =>
    coaches?.map((coach) => (
      <p key={coach.id} onClick={setCoach(coach.id)}>
        {coach.firstName} {""}
        {coach.lastName}
      </p>
    ));

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <AddButton addForm={addForm} />
        <List items={formatCoaches()} />
      </div>

      <div className={styles.rightContainer}>
        <CoachesForm
          inputs={inputs}
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
      </div>
    </div>
  );
};

export default Coaches;
