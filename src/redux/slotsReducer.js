import {
  GET_SLOTS,
  ADD_SLOT,
  UPDATE_SLOT,
  DELETE_SLOT,
  RESET_SLOTS,
} from "./types";

const initialState = {
  data: [],
};

const handlers = {
  [GET_SLOTS]: (state, { payload }) => ({
    ...state,
    data: [...state.data, ...payload],
  }),
  [ADD_SLOT]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  }),
  [UPDATE_SLOT]: (state, { payload }) => ({
    ...state,
    data: [
      ...state.data.map((item) => (item.id === payload.id ? payload : item)),
    ],
  }),
  [DELETE_SLOT]: (state, { payload }) => ({
    ...state,
    data: [...state.data.filter((item) => item.id !== payload)],
  }),
  [RESET_SLOTS]: (state) => initialState,
  DEFAULT: (state) => state,
};
export const slotsReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
