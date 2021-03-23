import React from "react";

import styles from "../MainStyles/mainStyles.module.css";

const List = (props) => {
  return <div className={styles.resultList}>{props.items}</div>;
};

export default List;
