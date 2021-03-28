import {
  ADD_SERVICE,
  GET_SERVICES,
  RESET_SERVICES,
  ADD_COACH,
  GET_COACHES,
  UPDATE_COACH,
  DELETE_COACH,
  RESET_COACHES,
  GET_CLIENTS,
  RESET_CLIENTS,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  GET_SLOTS,
  ADD_SLOT,
  DELETE_SLOT,
  RESET_SLOTS,
  GET_QUALIFICATIONS,
  ADD_QUALIFICATION,
  DELETE_QUALIFICATION,
  RESET_QUALIFICATIONS,
  GET_BOOKINGS,
  RESET_BOOKINGS,
  DELETE_BOOKING,
  UPDATE_BOOKING,
} from "./types";
import { mockApi as Api1, realApi as Api } from "./axios";

// SERVICES

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
    } catch (e) {
      console.log(e.response.data.title);
    }
  };
}

export function deleteService(serviceId) {
  return async (dispatch) => {
    try {
      await Api.delete(`Services/`, { params: { serviceId } });
      dispatch({
        type: DELETE_SERVICE,
        payload: serviceId,
      });
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

// COACHES

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
    } catch (e) {
      console.log(e.response.data.title);
    }
  };
}

export function deleteCoach(coachId) {
  return async (dispatch) => {
    try {
      await Api.delete(`Coach/`, { params: { coachId } });
      dispatch({
        type: DELETE_COACH,
        payload: coachId,
      });
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

// CLIENTS

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

// SLOTS

export function getSlots() {
  return async (dispatch) => {
    const slots = await Api.get("Slots/");
    dispatch({
      type: GET_SLOTS,
      payload: slots.data,
    });
  };
}

export function addSlot(slotArr) {
  return async (dispatch) => {
    try {
      await Api.post("Slots/", slotArr);
      
      dispatch({
        type: ADD_SLOT,
        payload: slotArr,
      });
    } catch (e) {
      console.log(e.response.data.title);
    }
  };
}

export function deleteSlot(slotArr) {
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

// QUALIFICATIONS

export function getQualifications(param, id) {
  return async (dispatch) => {
    const qualifications = await Api.get(`Qualification/${param}/${id}`);
    dispatch({
      type: GET_QUALIFICATIONS,
      payload: qualifications.data,
    });
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
      return e.response.data.title
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

// BOOKING

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
