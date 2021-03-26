import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Coaches from "./Coaches";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => [
    {
      id: 1,
      firstName: "test",
      lastName: "user",
      dateBirth: "2001-01-01",
      description: "123",
      phoneNumber: "123",
    },
  ],
}));

jest.mock("../../redux/actions", () => ({
  ...jest.requireActual("../../redux/actions"),
  addCoach: () => ({ type: "some/type" }),
}));

describe("Coaches", () => {
  it("should render properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Coaches />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("blurHandler should trigger on input and on blur", async () => {
    const { getByTestId, findByTestId } = render(
      <Provider store={store}>
        <Coaches />
      </Provider>
    );

    const firstname = getByTestId("form-firstname");
    const lastname = getByTestId("form-lastname");
    const description = getByTestId("form-description");
    const birthdate = getByTestId("form-birthdate");
    const phone = getByTestId("form-phone");

    const value = {
      target: { value: "2020-05-24" },
    };
    const emptyValue = {
      target: { value: "" },
    };

    const submitButton = getByTestId("crud-button-submit");
    const addButton = getByTestId("add-button");
    const coachForm = getByTestId("coach-form");

    expect(submitButton).toBeDisabled();

    // fill the form
    fireEvent.change(firstname, value);
    fireEvent.change(lastname, value);
    fireEvent.change(description, value);
    fireEvent.change(birthdate, value);
    fireEvent.change(phone, value);

    expect(submitButton).not.toBeDisabled();

    // check blur
    fireEvent.change(phone, emptyValue);
    fireEvent.blur(phone);

    expect(submitButton).toBeDisabled();

    // fill the form
    fireEvent.change(phone, value);

    expect(submitButton).not.toBeDisabled();

    // check add button
    fireEvent.click(addButton);

    expect(submitButton).toBeDisabled();

    // check submit
    fireEvent.change(firstname, value);
    fireEvent.change(lastname, value);
    fireEvent.change(description, value);
    fireEvent.change(birthdate, value);
    fireEvent.change(phone, value);
    expect(submitButton).not.toBeDisabled();

    fireEvent.submit(coachForm);
    expect(submitButton).toBeDisabled();

    // check update
    const listItem = await findByTestId("list-item");
    expect(listItem).toBeInTheDocument();

    await fireEvent.click(listItem);

    const updateButton = getByTestId("crud-button-update");
    const deleteButton = getByTestId("crud-button-delete");

    expect(updateButton).not.toBeDisabled();
    expect(deleteButton).not.toBeDisabled();

    await fireEvent.click(updateButton);
    expect(submitButton).toBeDisabled();
  });
});
