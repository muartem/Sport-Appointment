import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Booking from "../Booking";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => [
    {
      id: 1,
      slot: {
        id: 2,
        coachId: 3,
        dateStart: "test",
        timeStart: "test",
        duration: "test",
      },
      serviceId: 1,
      clientId: 2,
      resultPrice: 3,
    },
  ],
}));
describe("Booking", () => {
  it("should render properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Booking />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
