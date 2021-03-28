import {realApi as Api} from "../axios";


const GET_BOOKINGS = "PM_FIGHT/BOOKING/GET";
const RESET_BOOKINGS = "PM_FIGHT/BOOKING/RESET";
const DELETE_BOOKING = "PM_FIGHT/BOOKING/DELETE";
const UPDATE_BOOKING = "PM_FIGHT/BOOKING/UPDATE";


export function getBookings() {
    return async (dispatch) => {
        const booking = await Api.get("Booking/");
        dispatch({
            type: GET_BOOKINGS,
            payload: booking.data,
        });
    };
}

export function resetBookings() {
    return (dispatch) => {
        dispatch({
            type: RESET_BOOKINGS,
        });
    };
}

export function updateBooking(booking) {
    return async (dispatch) => {
        try {
            console.log(booking.id);
            await Api.post(`Booking/update`, booking);
            dispatch({
                type: UPDATE_BOOKING,
                payload: booking,
            });
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}

export function deleteBooking(bookingId) {
    return async (dispatch) => {
        try {
            console.log(bookingId);
            await Api.delete(`Booking/`, { params: { bookingId } });
            dispatch({
                type: DELETE_BOOKING,
                payload: bookingId,
            });
        } catch (e) {
            console.log(e.response.data.title);
        }
    };
}


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


export default bookingReducer;
