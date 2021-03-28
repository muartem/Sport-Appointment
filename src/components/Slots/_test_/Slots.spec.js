import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Slots from "../Slots";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => [
    {
      id: 1,
      coachId: 1,
      dateStart: "test",
      timeStart: "test",
      timeEnd: "test",
    },
  ],
}));
describe("Slots", () => {
  it("should render properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Slots />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
