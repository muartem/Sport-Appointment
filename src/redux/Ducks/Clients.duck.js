import Api from "../../services/api";

const GET_CLIENTS = "PM_FIGHT/CLIENTS/GET";
const RESET_CLIENTS = "PM_FIGHT/CLIENTS/RESET";


export function getClients() {
    return async (dispatch) => {
        const clients = await Api.get("Client/");
        dispatch({
            type: GET_CLIENTS,
            payload: clients.data,
        });
    };
}

export function resetClient() {
    return (dispatch) => {
        dispatch({
            type: RESET_CLIENTS,
        });
    };
}


const initialState = {
    data: [],
};

const handlers = {
    [GET_CLIENTS]: (state, { payload }) => ({
        ...state,
        data: [...state.data, ...payload],
    }),
    [RESET_CLIENTS]: (state) => initialState,
    DEFAULT: (state) => state,
};

const clientReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};


export default clientReducer;
