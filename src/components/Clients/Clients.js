import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients, resetClient } from "../../redux/actions";
import { clientsSelector } from "./Clients.selector";

import styles from "../MainStyles/mainStyles.module.css";

const Clients = () => {
  const dispatch = useDispatch();

  const clients = useSelector(clientsSelector);

  useEffect(() => {
    dispatch(getClients());
    return () => dispatch(resetClient());
  }, [dispatch]);

  const formatClients = () =>
    clients?.map((client) => (
      <div key={client.id}>
        <p>{client.name}</p>
        <span className={styles.clientlogin}>{client.login}</span>
      </div>
    ));

  return (
    <div className={styles.clientContainer}>
      <div className={styles.resultList}>{formatClients()}</div>
    </div>
  );
};

export default Clients;
