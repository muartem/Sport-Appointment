import {
  GET_BOOKINGS,
  RESET_BOOKINGS,
  DELETE_BOOKING,
  UPDATE_BOOKING,
} from "./types";

const initialState = {
  data: [],
};

const handlers = {
  [GET_BOOKINGS]: (state, { payload }) => ({
    ...state,
    data: [...state.data, ...payload],
  }),
  [RESET_BOOKINGS]: (state) => initialState,
  DEFAULT: (state) => state,
  [UPDATE_BOOKING]: (state, { payload }) => ({
    ...state,
    data: [
      ...state.data.map((item) => (item.id === payload.id ? payload : item)),
    ],
  }),
  [DELETE_BOOKING]: (state, { payload }) => ({
    ...state,
    data: [...state.data.filter((item) => item.id !== payload)],
  }),
};

export const bookingReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
