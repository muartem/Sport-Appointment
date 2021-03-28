import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Services from "../Services";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => [
    {
      name: "test",
      description: "123",
      price: "123",
    },
  ],
}));

jest.mock("../../../redux/Ducks/Services.duck.js", () => ({
  ...jest.requireActual("../../../redux/Ducks/Services.duck.js"),
  addService: () => ({ type: "some/type" }),
}));

describe("Services", () => {
  it("should render properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Services />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("blurHandler should trigger on input and on blur", async () => {
    const { getByTestId, findByTestId } = render(
      <Provider store={store}>
        <Services />
      </Provider>
    );

    const name = getByTestId("form-name");
    const description = getByTestId("form-description");
    const price = getByTestId("form-price");

    const value = {
      target: { value: "test" },
    };
    const emptyValue = {
      target: { value: "" },
    };

    const submitButton = getByTestId("crud-button-submit");
    const addButton = getByTestId("add-button");
    const servicesForm = getByTestId("service-form");

    expect(submitButton).toBeDisabled();

    // fill the form
    fireEvent.change(name, value);

    fireEvent.change(description, value);

    fireEvent.change(price, value);

    expect(submitButton).not.toBeDisabled();

    // check blur
    fireEvent.change(name, emptyValue);
    fireEvent.blur(name);

    expect(submitButton).toBeDisabled();

    // fill the form
    fireEvent.change(price, value);

    expect(submitButton).toBeDisabled();

    // check add button
    fireEvent.click(addButton);

    expect(submitButton).toBeDisabled();

    // check submit
    fireEvent.change(name, value);
    fireEvent.change(description, value);
    fireEvent.change(price, value);
    expect(submitButton).not.toBeDisabled();

    fireEvent.submit(servicesForm);
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
