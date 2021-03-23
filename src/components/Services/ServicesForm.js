import React from "react";
import Input from "../Input/Input";
import CRUDButtons from "../buttons/CRUDButtons/CRUDButtons";

const ServiceForm = (props) => {
  return (
    <form action="" onSubmit={props.submitHandler}>
      <Input
        key={props.inputs.name.name + "_service"}
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.name.name}
        defaultValue={props.inputs.name.value}
        error={props.inputs.name?.error}
      />
      <Input
        key={props.inputs.description.name + "_service"}
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.description.name}
        defaultValue={props.inputs.description.value}
        error={props.inputs.description?.error}
      />
      <Input
        key={props.inputs.price.name + "_service"}
        onBlur={props.blurHandler}
        onChange={props.inputHandler}
        type="text"
        name={props.inputs.price.name}
        defaultValue={props.inputs.price.value}
        error={props.inputs.price?.error}
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

export default ServiceForm;
