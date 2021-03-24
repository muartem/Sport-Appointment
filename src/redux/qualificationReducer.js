import {ADD_QUALIFICATION, DELETE_QUALIFICATION, GET_QUALIFICATIONS, RESET_QUALIFICATIONS} from './types';

const initialState = {
  data: [],
};

const handlers = {
  [GET_QUALIFICATIONS]: (state, { payload }) => ({
    ...state,
    data: [...state.data, ...payload],
  }),
  [ADD_QUALIFICATION]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  }),
  [DELETE_QUALIFICATION]: (state, { payload }) => ({
    ...state,
    data: [...state.data.filter(item => item.id !== payload)],
  }),
  [RESET_QUALIFICATIONS]: (state) => initialState,
  DEFAULT: (state) => state,
};
export const qualificationReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
