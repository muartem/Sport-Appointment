import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  deleteService,
  getServices,
  resetService,
  updateService,
} from "../../redux/actions";
import styles from "../MainStyles/mainStyles.module.css";
import List from "../List/List";
import AddButton from "../buttons/AddButton/AddButton";
import ServiceForm from "./ServicesForm";

const Services = () => {
  const dispatch = useDispatch();

  const services = useSelector((state) => state.service.data);
  const [service, setUpdateService] = useState({});

  const [isCreateButtonDisabled, setCreateButtonDisabling] = useState(true);
  const [isDeleteButtonDisabled, setDeleteButtonDisabling] = useState(true);
  const [isUpdateButtonDisabling, setUpdateButtonDisabling] = useState(true);

  const [isCreateButtonVisible, setCreateButtonVisibility] = useState(true);
  const [isDeleteButtonVisible, setDeleteButtonVisibility] = useState(false);
  const [isUpdateButtonVisible, setUpdateButtonVisibility] = useState(false);

  const initialInputs = {
    name: {
      name: "name",
      value: "",
      error: "",
    },
    description: {
      name: "description",
      value: "",
      error: "",
    },
    price: {
      name: "price",
      value: "",
      error: "",
    },
  };

  const [inputs, setInputs] = useState({ ...initialInputs });

  useEffect(() => {
    dispatch(getServices());
    return () => dispatch(resetService());
  }, [dispatch]);

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
      [inputs.name.value, inputs.price.value, inputs.description.value].every(
        (i) => i.length > 0
      )
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
      addService({
        id: services.sort((a, b) => b.id - a.id)[0].id + 1,
        name: inputs.name.value,
        description: inputs.description.value,
        price: inputs.price.value,
      })
    );
    initialFormState();
  };

  const updateHandler = () => {
    dispatch(
      updateService({
        name: inputs.name.value,
        description: inputs.description.value,
        price: inputs.price.value,
        id: service.id,
      })
    );
    initialFormState();
  };

  const deleteHandler = () => {
    dispatch(deleteService(service.id));
    initialFormState();
  };

  const addForm = (e) => {
    initialFormState();
  };

  const setService = (serviceId) => {
    return (e) => {
      setCreateButtonVisibility(false);
      setDeleteButtonVisibility(true);
      setUpdateButtonVisibility(true);
      setDeleteButtonDisabling(false);
      const service = services.find((service) => service.id === serviceId);
      setUpdateService(service);
      const serviceInput = {
        name: {
          name: "name",
          value: service.name,
          error: "",
        },
        description: {
          name: "description",
          value: service.description,
          error: "",
        },
        price: {
          name: "price",
          value: service.price,
          error: "",
        },
      };
      setInputs((state) => ({ ...serviceInput }));
    };
  };

  const formatServices = () =>
    services?.map((s) => (
      <p key={s.id} onClick={setService(s.id)}>
        {s.name}
      </p>
    ));

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <AddButton addForm={addForm} />
        <List items={formatServices()} />
      </div>

      <div className={styles.rightContainer}>
        <ServiceForm
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

export default Services;
