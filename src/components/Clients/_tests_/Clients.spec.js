import React from "react";
import { mount } from "enzyme";
import Clients from "../Clients";

import { getClients, resetClient } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) => selector(),
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
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(2, Symbol.for("resetClients"));
  });
  // it("should render list of clients", () => {});
  // it("should render empty page if there are no clients in the list", () => {});
});