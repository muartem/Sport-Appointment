import React from "react";

import Input from "../Input/Input";
import CRUDButtons from "../buttons/CRUDButtons/CRUDButtons";

const CoachesForm = (props) => {
  return (
    <form action="" onSubmit={props.submitHandler}>
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.firstName.name}
        defaultValue={props.inputs.firstName.value}
        error={props.inputs.firstName?.error}
      />
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.lastName.name}
        defaultValue={props.inputs.lastName.value}
        error={props.inputs.lastName?.error}
      />
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.description.name}
        defaultValue={props.inputs.description.value}
        error={props.inputs.description?.error}
      />
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="date"
        name={props.inputs.birthDate.name}
        defaultValue={props.inputs.birthDate.value}
        error={props.inputs.birthDate?.error}
      />
      <Input
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="tel"
        name={props.inputs.phoneNumber.name}
        defaultValue={props.inputs.phoneNumber.value}
        error={props.inputs.phoneNumber?.error}
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
