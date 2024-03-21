import Api from "../../services/api";

const GET_COACHES = "PM_FIGHT/COACHES/GET";
const ADD_COACH = "PM_FIGHT/COACHES/ADD";
const UPDATE_COACH = "PM_FIGHT/COACHES/UPDATE";
const DELETE_COACH = "PM_FIGHT/COACHES/DELETE";
const RESET_COACHES = "PM_FIGHT/COACHES/RESET";

export function getCoaches() {
    return async (dispatch) => {
        const coaches = await Api.get("Coach/");
        dispatch({
            type: GET_COACHES,
            payload: coaches.data,
        });
    };
}

export function addCoach(coach) {
    return async (dispatch) => {
        try {
            await Api.post("Coach/", coach);
            dispatch({
                type: ADD_COACH,
                payload: coach,
            });
            dispatch(getCoaches())
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function updateCoach(coach) {
    console.log(coach);
    return async (dispatch) => {
        try {
            await Api.post(`Coach/update`, coach);
            dispatch({
                type: UPDATE_COACH,
                payload: coach,
            });
            dispatch(getCoaches())
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function deleteCoach(coachId) {
    return async (dispatch) => {
        try {
            await Api.delete(`Coach/${coachId}`);
            dispatch({
                type: DELETE_COACH,
                payload: coachId,
            });
            dispatch(getCoaches())
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function resetCoach() {
    return (dispatch) => {
        dispatch({
            type: RESET_COACHES,
        });
    };
}

const initialState = {
    data: [],
};

const handlers = {
    [GET_COACHES]: (state, { payload }) => ({
        ...state,
        data: payload
    }),
    [ADD_COACH]: (state, { payload }) => ({
        ...state,
        data: [...state.data, payload],
    }),
    [UPDATE_COACH]: (state, { payload }) => ({
        ...state,
        data: [
            ...state.data.map((item) => (item.id === payload.id ? payload : item)),
        ],
    }),
    [DELETE_COACH]: (state, { payload }) => ({
        ...state,
        data: [...state.data.filter((item) => item.id !== payload)],
    }),
    [RESET_COACHES]: (state) => initialState,
    DEFAULT: (state) => state,
};

const coachReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};

export default coachReducer;
