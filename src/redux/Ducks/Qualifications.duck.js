import {realApi as Api} from "../axios";


const GET_QUALIFICATIONS = "PM_FIGHT/QUALIFICATIONS/GET";
const ADD_QUALIFICATION = "PM_FIGHT/QUALIFICATIONS/ADD";
const DELETE_QUALIFICATION = "PM_FIGHT/QUALIFICATIONS/DELETE";
const RESET_QUALIFICATIONS = "PM_FIGHT/QUALIFICATIONS/RESET";


export function getQualifications(param, id) {
    return async (dispatch) => {
        try {
            const qualifications = await Api.get(`Qualification/${param}/qualification/${id}`);
            dispatch({
                type: GET_QUALIFICATIONS,
                payload: qualifications.data,
            });
        } catch (e){
            console.log(e.response.data);
        }

    };
}

export function addQualification(qualification) {
    return async (dispatch) => {
        try {
            await Api.post("Qualification/", qualification);
            dispatch({
                type: ADD_QUALIFICATION,
                payload: qualification,
            });
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function deleteQualifications(qualificationId) {
    return async (dispatch) => {
        try {
            await Api.delete(`Qualification/?qualificationId=${qualificationId}`)
            dispatch({
                type: DELETE_QUALIFICATION,
                payload: qualificationId,
            });
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function resetQualifications() {
    return (dispatch) => {
        dispatch({
            type: RESET_QUALIFICATIONS,
        });
    };
}



const initialState = {
    data: [],
};

const handlers = {
    [GET_QUALIFICATIONS]: (state, { payload }) => ({
        ...state,
        data: payload,
    }),
    [ADD_QUALIFICATION]: (state, { payload }) => ({
        ...state,
        data: [...state.data, payload],
    }),
    [DELETE_QUALIFICATION]: (state, { payload }) => ({
        ...state,
        data: [...state.data.filter(item => item.id !== payload)],
    }),
    [RESET_QUALIFICATIONS]: () => initialState,
    DEFAULT: (state) => state,
};
export const qualificationReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};


export default qualificationReducer;
