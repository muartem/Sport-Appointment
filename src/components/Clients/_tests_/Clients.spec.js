import React from "react";
import { mount, shallow } from "enzyme";
import Clients from "../Clients";
import clientsSelector from "../Clients.selector";

import { getClients, resetClient } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) => selector,
}));

jest.mock("../../../redux/actions", () => ({
  getClients: jest.fn(() => Symbol.for("getClients")),
  resetClient: jest.fn(() => Symbol.for("resetClient")),
}));

jest.mock("../Clients.selector", () => ({
  __esModule: true,
  default: jest.fn(() => []),
}));

describe("Clients component", () => {
  beforeEach(() => {
    getClients.mockReturnValue(Symbol.for("getClients"));
    resetClient.mockReturnValue(Symbol.for("resetClients"));
  });

  it("should get clients list on mount and reset list unmount", () => {
    const component = mount(<Clients />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(Symbol.for("getClients"));
    component.unmount();
    // expect(jest.fn()).toHaveBeenCalledTimes(2);
    // expect(mockDispatch).toHaveBeenCalledWith(Symbol.for("resetClients"));
  });
  it("should render list of clients", () => {
    clientsSelector.mockReturnValueOnce(() => [
      {
        id: 1,
        name: "Joni",
        phoneNumber: "911",
      },
      {
        id: 2,
        name: "Julia",
        phoneNumber: "101",
      },
      {
        id: 3,
        name: "Julian",
        phoneNumber: "1287678601",
      },
    ]);

    const component = shallow(<Clients />);

    // const resultList = component.find(".resultList");
    // expect(resultList.children.length).toBe(1);
    expect(component).toMatchSnapshot();
  });
  // it("should render empty page if there are no clients in the list", () => {
  //   clientsSelector.mockReturnValueOnce([]);
  //   const component = shallow(<Clients />);

  //   const resultList = component.find(".resultList");
  //   expect(resultList.children.length).toBe(0);
  //   expect(component).toMatchSnapshot();
  // });
});
