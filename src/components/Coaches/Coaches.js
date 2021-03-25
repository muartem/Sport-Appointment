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
import { formattedDate, unformattedDate } from "../formattedDate/formattedDate";
import TransferList from "../TransferList/TransferList";

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

  const [isTransferListVisible, setTransferListVisibility] = useState(false);

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
    dateBirth: {
      name: "dateBirth",
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
    setTransferListVisibility(false);
    setInputs((state) => ({ ...initialInputs }));
  };


  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInputs((state) => ({
      ...state,
      [name]: {
        ...state[name],
        value: value,
        error: "",
      },
    }));

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
      const { name } = e.target;
      setInputs((state) => ({
        ...state,
        [name]: {
          ...state[name],
          error: "Empty field",
        },
      }));
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
        dateBirth: formattedDate(inputs.dateBirth.value),
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
        dateBirth: inputs.dateBirth.value,
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
    return async (e) => {
      setCreateButtonVisibility(false);
      setDeleteButtonVisibility(true);
      setUpdateButtonVisibility(true);
      setDeleteButtonDisabling(false);
      await setTransferListVisibility(false)
      const coach = coaches.find((coach) => coach.id === coachId);
      setUpdateCoach(coach);
      setTransferListVisibility(true)
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
        dateBirth: {
          name: "dateBirth",
          value: unformattedDate(coach.dateBirth),
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
        {isTransferListVisible &&
        <div>
          <h3 className={styles.yellow}>{coach.firstName} {coach.lastName}</h3>
          <TransferList searchParam="CoachId" searchId={coach.id} left={["one"]} right={["two"]} />
        </div>
        }
      </div>
    </div>
  );
};

export default Coaches;
