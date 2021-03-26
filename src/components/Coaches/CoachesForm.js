import React from 'react';

import Input from '../Input/Input';
import CRUDButtons from '../buttons/CRUDButtons/CRUDButtons';

const CoachesForm = (props) => {
  return (
    <form data-testid="coach-form" action="" onSubmit={props.submitHandler}>
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.firstName.name}
        defaultValue={props.inputs.firstName.value}
        error={props.inputs.firstName?.error}
        testid="form-firstname"
      />
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.lastName.name}
        defaultValue={props.inputs.lastName.value}
        error={props.inputs.lastName?.error}
        testid="form-lastname"
      />
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.description.name}
        defaultValue={props.inputs.description.value}
        error={props.inputs.description?.error}
        testid="form-description"
      />
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="date"
        name={props.inputs.dateBirth.name}
        defaultValue={props.inputs.dateBirth.value}
        error={props.inputs.dateBirth?.error}
        testid="form-birthdate"
      />
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="tel"
        name={props.inputs.phoneNumber.name}
        defaultValue={props.inputs.phoneNumber.value}
        error={props.inputs.phoneNumber?.error}
        testid="form-phone"
      />
      <CRUDButtons
        updateHandler={props.updateHandler}
        deleteHandler={props.deleteHandler}
        isCreateButtonVisible={props.isCreateButtonVisible}
        isCreateButtonDisabled={props.isCreateButtonDisabled}
        isUpdateButtonVisible={props.isUpdateButtonVisible}
        isUpdateButtonDisabling={props.isUpdateButtonDisabling}
        isDeleteButtonVisible={props.isDeleteButtonVisible}
        isDeleteButtonDisabled={props.isDeleteButtonDisabled}
      />
    </form>
  );
};

export default CoachesForm;
