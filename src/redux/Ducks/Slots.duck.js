import { realApi as Api } from "../axios";

const GET_SLOTS = "PM_FIGHT/SLOTS/GET";
const ADD_SLOT = "PM_FIGHT/SLOTS/ADD";
const DELETE_SLOT = "PM_FIGHT/SLOTS/DELETE";
const RESET_SLOTS = "PM_FIGHT/SLOTS/RESET";

export function getSlots() {
  return async (dispatch) => {
    const slots = await Api.get("Slots/");
    dispatch({
      type: GET_SLOTS,
      payload: slots.data,
    });
  };
}

export function addSlots(slotArr) {
  console.log(slotArr);

  return async (dispatch) => {
    try {
      await Api.post("Slots/", slotArr);

      dispatch({
        type: ADD_SLOT,
        payload: slotArr,
      });
      dispatch(getSlots());
    } catch (e) {
      console.log(e.response.data.title);
    }
  };
}

export function deleteSlots(slotArr) {
  console.log(slotArr);
  return async (dispatch) => {
    try {
      await Api.delete(`Slots/`, {
        data: slotArr,
        headers: { "Content-Type": "application/json" },
      });

      dispatch({
        type: DELETE_SLOT,
        payload: slotArr,
      });
      dispatch(getSlots());
    } catch (e) {
      console.log(e.response.data.title);
    }
  };
}

export function resetSlots() {
  return (dispatch) => {
    dispatch({
      type: RESET_SLOTS,
    });
  };
}

const initialState = {
  data: [],
};

const handlers = {
  [GET_SLOTS]: (state, { payload }) => ({
    ...state,
    data: payload,
  }),
  [ADD_SLOT]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
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

export default slotsReducer;
