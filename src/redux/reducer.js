import { combineReducers } from "redux";

import serviceReducer from "./Ducks/Services.duck";
import coachReducer from "./Ducks/Coaches.duck";
import clientReducer from "./Ducks/Clients.duck";
import qualificationReducer from "./Ducks/Qualifications.duck";
import slotsReducer from "./Ducks/Slots.duck";
import bookingReducer from "./Ducks/Bookings.duck";

export const reducer = combineReducers({
  service: serviceReducer,
  coach: coachReducer,
  client: clientReducer,
  slots: slotsReducer,
  qualification: qualificationReducer,
  booking: bookingReducer,
});
