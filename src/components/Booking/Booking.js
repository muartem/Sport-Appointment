import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSlots,
  resetSlots,
  getCoaches,
  resetCoach,
  getClients,
  resetClient,
  getBookings,
  resetBookings,
  deleteBooking,
  getServices,
  resetService,
} from "../../redux/actions";
import { clientsSelector } from "../Clients/Clients.selector";
import "../Slots/slots.css";
import styles from "../MainStyles/mainStyles.module.css";

const Booking = () => {
  const dispatch = useDispatch();

  // CLIENTS

  const clients = useSelector(clientsSelector);
  const [clientId, setClientId] = useState(0);

  useEffect(() => {
    dispatch(getClients());
    return () => dispatch(resetClient());
  }, [dispatch]);

  const formatClients = () =>
    clients?.map((client) => (
      <option key={client.id} value={client.id}>
        {client.name}
      </option>
    ));

  // COACHES

  const coaches = useSelector((state) => state.coach.data);

  useEffect(() => {
    dispatch(getCoaches());
    return () => dispatch(resetCoach());
  }, []);

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
  const [serviceId, setServiceId] = useState(0);

  useEffect(() => {
    dispatch(getServices());
    return () => dispatch(resetService());
  }, []);

  const formatServices = () =>
    services?.map((service) => (
      <option key={service.id} value={service.id}>
        {service.name}
      </option>
    ));

  // SLOTS

  const slots = useSelector((state) => state.slots.data);

  useEffect(() => {
    dispatch(getSlots());
    return () => dispatch(resetSlots());
  }, [dispatch]);

  const getCoachFromSlot = (booking) =>
    slots
      .filter((slot) => slot.id === booking.slotId)
      .map((slot) => (
        <div key={slot.id}>
          <h3>{slot.date}</h3>
          <p>
            {slot.startTime}-{slot.endTime}
          </p>
          <div>{getCoachName(slot.coachId)}</div>
        </div>
      ));

  // BOOKING

  const bookings = useSelector((state) => state.booking.data);

  useEffect(() => {
    dispatch(getBookings());
    return () => dispatch(resetBookings());
  }, [dispatch]);

  const deleteHandler = (e) => {
    dispatch(deleteBooking(e.target.id));
    dispatch(resetBookings());
  };

  const findBooking = () =>
    bookings
      .filter(
        (booking) =>
          booking.serviceId === serviceId && booking.clientId === clientId
      )
      .map((booking) => (
        <div key={booking.id} className={styles.bookingBox}>
          {getCoachFromSlot(booking)}
          <button
            className={styles.addBtn}
            onClick={deleteHandler}
            id={booking.id}
          >
            Delete
          </button>
        </div>
      ));

  return (
    <div>
      <div className={styles.bookingSelects}>
        <select onChange={(e) => setServiceId(Number(e.target.value))}>
          {formatServices()}
        </select>
        <select onChange={(e) => setClientId(Number(e.target.value))}>
          {formatClients()}
        </select>
      </div>
      <div className={styles.bookingContaier}>{findBooking()}</div>
    </div>
  );
};

export default Booking;
