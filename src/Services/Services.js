import React from "react";
import Input from "../Input/Input";
import styles from "./services.module.css";

class Services extends React.Component {
  render() {
    const arr = [
      "CROSSFIT",
      "STRETCHING",
      "TRX",
      "FITNESS",
      "BOX",
      "MMA",
      "KARATE",
      "GYM",
      "CROSSFIT",
      "STRETCHING",
      "TRX",
      "FITNESS",
      "BOX",
      "MMA",
      "KARATE",
      "GYM",
    ];

    const formatListItems = () => {
      return arr.map((item) => <p className={styles.resumeDate}>{item}</p>);
    };

    return (
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <button className={styles.addBtn}>
            <p className={styles.addBtnText}>Add</p>
            <div className={styles.addBtnPlus}>+</div>
          </button>
          <div className={styles.resultList}>{formatListItems(arr)}</div>
        </div>

        <form action="" className={styles.rightContainer}>
          <Input type="text" name="name" />
          <Input type="text" name="description" />
          <Input type="text" name="price" />
          <button type="submit" className={styles.addBtn}>
            <p className={styles.addBtnText}>Done</p>
          </button>
        </form>
      </div>
    );
  }
}

export default Services;
