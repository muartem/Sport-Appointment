import Api from "../../services/api";

const GET_SERVICES = "PM_FIGHT/SERVICES/GET";
const ADD_SERVICE = "PM_FIGHT/SERVICES/ADD";
const UPDATE_SERVICE = "PM_FIGHT/SERVICES/UPDATE";
const DELETE_SERVICE = "PM_FIGHT/SERVICES/DELETE";
const RESET_SERVICES = "PM_FIGHT/SERVICES/RESET";

export function getServices() {
    return async (dispatch) => {
        const services = await Api.get("Services/");
        dispatch({
            type: GET_SERVICES,
            payload: services.data,
        });
    };
}

export function addService(service) {
    return async (dispatch) => {
        try {
            await Api.post("Services/", service);
            dispatch({
                type: ADD_SERVICE,
                payload: service,
            });
            dispatch(getServices())
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function updateService(service) {
    return async (dispatch) => {
        try {
            await Api.post(`Services/update`, service);
            dispatch({
                type: UPDATE_SERVICE,
                payload: service,
            });
            dispatch(getServices())
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function deleteService(serviceId) {
    return async (dispatch) => {
        try {
            await Api.delete(`Services/${serviceId}`);
            dispatch({
                type: DELETE_SERVICE,
                payload: serviceId,
            });
            dispatch(getServices())
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function resetService() {
    return (dispatch) => {
        dispatch({
            type: RESET_SERVICES,
        });
    };
}


const initialState = {
    data: [],
};

const handlers = {
    [GET_SERVICES]: (state, { payload }) => ({
        ...state,
        data: payload,
    }),
    [ADD_SERVICE]: (state, { payload }) => ({
        ...state,
        data: [...state.data, payload],
    }),
    [UPDATE_SERVICE]: (state, { payload }) => ({
        ...state,
        data: [...state.data.map(item => item.id === payload.id ? payload : item)],
    }),
    [DELETE_SERVICE]: (state, { payload }) => ({
        ...state,
        data: [...state.data.filter(item => item.id !== payload)],
    }),
    [RESET_SERVICES]: (state) => initialState,
    DEFAULT: (state) => state,
};

const serviceReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};

export default serviceReducer;
