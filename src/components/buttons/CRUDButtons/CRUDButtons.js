import React from 'react';

import styles from '../../../assets/styles/mainStyles.module.css';

const CRUDButtons = (props) => {
  return (
    <div className={styles.btnContainer}>
      {props.isCreateButtonVisible && (
        <button
          type="submit"
          disabled={props.isCreateButtonDisabled}
          className={styles.addBtn}
          data-testid="crud-button-submit"
        >
          <p className={styles.addBtnText}>Done</p>
        </button>
      )}
      {props.isUpdateButtonVisible && (
        <button
          onClick={props.updateHandler}
          disabled={props.isUpdateButtonDisabling}
          className={styles.addBtn}
          data-testid="crud-button-update"
        >
          <p className={styles.addBtnText}>Update</p>
        </button>
      )}

      {props.isDeleteButtonVisible && (
        <button
          onClick={props.deleteHandler}
          disabled={props.isDeleteButtonDisabled}
          className={styles.addBtn}
          data-testid="crud-button-delete"
        >
          <p className={styles.addBtnText}>Delete</p>
        </button>
      )}
    </div>
  );
};

export default CRUDButtons;
