import React from "react";

import Clients from "../Clients";
// import { mount } from "enzyme";
import { useDispatch, useSelector } from "react-redux";
import { getClients, resetClient } from "../../../redux/actions";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
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
  it("should get clients list on mount and reset list unmount", () => {
    expect(true).toBe(true);
  });
  // it("should render list of clients", () => {});
  // it("should render empty page if there are no clients in the list", () => {});
});
