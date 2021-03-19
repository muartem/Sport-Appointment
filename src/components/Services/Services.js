import React, {useEffect} from "react";
import Input from "../Input/Input";
import styles from "./services.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getServices, resetService} from "../../redux/actions";

const Services = () => {
  const dispatch = useDispatch()

  const services = useSelector(state => state.service.data)

  useEffect(() => {
    dispatch(getServices())
    return () => dispatch(resetService())
  }, [])

  console.log(services);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <button className={styles.addBtn}>
          <p className={styles.addBtnText}>Add</p>
          <div className={styles.addBtnPlus}>+</div>
        </button>
        <div className={styles.resultList}>
          {services?.map((s) => <p key={s.name} className={styles.resumeDate}>{s.name}</p>)}
        </div>
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
  )
}

export default Services;
