import React from 'react';

import styles from '../../MainStyles/mainStyles.module.css';

const AddButton = (props) => {
  return (
    <button
      data-testid="add-button"
      onClick={props.addForm}
      className={styles.addBtn}
    >
      <p className={styles.addBtnText}>Add</p>
      <div className={styles.addBtnPlus}>+</div>
    </button>
  );
};

export default AddButton;
