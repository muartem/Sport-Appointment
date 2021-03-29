import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clientsSelector } from "../Clients/Clients.selector";
import {
  formattedTime,
  formattedDuration,
} from "../formattedDate/formattedDate";
import "../Slots/slots.css";
import styles from "../MainStyles/mainStyles.module.css";
import { getClients, resetClient } from "../../redux/Ducks/Clients.duck";
import { getCoaches, resetCoach } from "../../redux/Ducks/Coaches.duck";
import { getServices, resetService } from "../../redux/Ducks/Services.duck";
import { getSlots, resetSlots } from "../../redux/Ducks/Slots.duck";
import {
  deleteBooking,
  getBookings,
  resetBookings,
} from "../../redux/Ducks/Bookings.duck";

const Booking = () => {
  const dispatch = useDispatch();

  // CLIENTS

  const clients = useSelector(clientsSelector);
  const [selectedClientIndex, setClientIndex] = useState(0);

  useEffect(() => {
    dispatch(getClients());
    return () => dispatch(resetClient());
  }, [dispatch]);

  const formatClients = () =>
    clients?.map((client, index) => (
      <option key={client.id} value={index}>
        {client.name}
      </option>
    ));

  // COACHES

  const coaches = useSelector((state) => state.coach.data);

  useEffect(() => {
    dispatch(getCoaches());
    return () => dispatch(resetCoach());
  }, [dispatch]);

  const getCoachName = (id) =>
    coaches
      .filter((coach) => coach.id === id)
      .map((coach) => (
        <p key={coach.id}>
          Coach: {coach.firstName} {coach.lastName}
        </p>
      ));

  // SERVICES

  const services = useSelector((state) => state.service.data);
  const [serviceId, setServiceId] = useState();
  const [selectedServiceId, setServiceIndex] = useState(0);

  useEffect(() => {
    dispatch(getServices());
    return () => dispatch(resetService());
  }, [dispatch]);

  const formatServices = () =>
    services?.map((service, index) => (
      <option key={service.id} value={index}>
        {service.name}
      </option>
    ));

  // SLOTS

  const slots = useSelector((state) => state.slots.data);

  useEffect(() => {
    dispatch(getSlots());
    return () => dispatch(resetSlots());
  }, [dispatch]);

  const getCoachFromSlot = (slotId) =>
    slots
      .filter((slot) => slot.id === slotId)
      .map((slot) => <div key={slot.id}>{getCoachName(slot.coachId)}</div>);

  // BOOKING

  const bookings = useSelector((state) => state.booking.data);

  useEffect(() => {
    dispatch(getBookings());
    return () => dispatch(resetBookings());
  }, [dispatch]);

  const deleteHandler = (bookingId) => {
    dispatch(deleteBooking(bookingId));
    dispatch(resetBookings());
  };

  const findBooking = () =>
    bookings
      .filter((booking) => {
        return (
          booking.serviceId === services[selectedServiceId]?.id &&
          booking.clientId === clients[selectedClientIndex]?.id
        );
      })
      .map((booking) => {
        return (
          <div key={booking.id} className={styles.bookingBox}>
            <h3>
              {booking.slot.dateStart} - {booking.resultPrice}UAH
            </h3>
            <p>
              {booking.slot.timeStart}-
              {formattedTime(formattedDuration(booking.slot.timeStart))}
            </p>
            {getCoachFromSlot(booking.slot.id)}

            <button
              className={styles.addBtn}
              onClick={() => deleteHandler(booking.id)}
            >
              Delete
            </button>
          </div>
        );
      });

  return (
    <div>
      <div className={styles.bookingSelects}>
        <select onChange={(e) => setServiceIndex(Number(e.target.value))}>
          {formatServices()}
        </select>
        <select onChange={(e) => setClientIndex(Number(e.target.value))}>
          {formatClients()}
        </select>
      </div>
      <div className={styles.bookingContainer}>{findBooking()}</div>
    </div>
  );
};

export default Booking;
