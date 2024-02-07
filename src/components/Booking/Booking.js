import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clientsSelector } from "../Clients/Clients.selector";
import {
  formattedTime,
  formattedDuration, formattedDate,
} from "../formattedDate/formattedDate";
import "../Slots/slots.css";
import styles from "../../assets/styles/mainStyles.module.css";
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
  const [selectedClientId, setClientId] = useState(-1);

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

  const [selectedCoachId, setCoachId] = useState(-1);

  useEffect(() => {
    dispatch(getCoaches());
    return () => dispatch(resetCoach());
  }, [dispatch]);

  const formatCoaches= () =>
    coaches?.map((coach) => (
      <option key={coach.id} value={coach.id}>
        {coach.firstName} {coach.lastName}
      </option>
    ));
  // SERVICES

  const services = useSelector((state) => state.service.data);
  const [selectedServiceId, setServiceId] = useState(-1);

  useEffect(() => {
    dispatch(getServices());
    return () => dispatch(resetService());
  }, [dispatch]);

  const formatServices = () =>
    services?.map((service) => (
      <option key={service.id} value={service.id}>
        {service.name}
      </option>
    ));

  // SLOTS

  const slots = useSelector((state) => state.slots.data);
  const [selectedDate, setDate] = useState('all');

  useEffect(() => {
    dispatch(getSlots());
    return () => dispatch(resetSlots());
  }, [dispatch]);

  const formatDate = () => {
    const today = new Date()

    return [-1, 0, 1, 2, 3, 4, 5].map((i) => {
      const date = new Date()
      date.setDate(date.getDate() + i)
      const label = i === -1 ? 'Yesterday' :
        i === 0 ? 'Today' :
          i === 1 ? 'Tomorrow' : formattedDate(date)

      return (
        <option key={i} value={formattedDate(date)}>
          {label}
        </option>
    )});
  }

  // BOOKING

  const bookings = useSelector((state) => state.booking.data);

  useEffect(() => {
    dispatch(getBookings());
    return () => dispatch(resetBookings());
  }, [dispatch]);

  const deleteHandler = (bookingId) => {
    dispatch(deleteBooking(bookingId));
  };

  const findBooking = () =>
    bookings
      .filter((booking) => {
        const slot = slots.find(s => s.id == booking?.slotId)

        return (
          (selectedServiceId === -1 || booking.serviceId == selectedServiceId) &&
          (selectedClientId === -1 || booking.clientId == selectedClientId) &&
          (selectedCoachId === -1 || slot.coachId == selectedCoachId) &&
          (selectedDate === 'all' || formattedDate(slot.dateStart) === selectedDate)
        );
      })
      .map((booking) => {
        const slot = slots.find(s => s.id == booking?.slotId)
        const service = services.find(s => s.id == booking?.serviceId)
        const client = clients.find(c => c.id == booking?.clientId)
        const coach = coaches.find(c => c.id == slot?.coachId)

        return (
          <div key={booking.id} className={styles.bookingBox}>
            <h2>
              {service.name}
            </h2>
            <h3>
              {formattedDate(slot.dateStart)} - {service?.price} UAH
            </h3>
            <p>
              <b>Time:</b> {slot?.timeStart}-{formattedTime(formattedDuration(slot?.timeStart))}
            </p>
            <p>
              <b>Coach: </b>{coach.firstName} {coach.lastName}
            </p>
            <p>
              <b>Client: </b>{client.name}
            </p>
            <button
              className={styles.addBtn}
              onClick={() => deleteHandler(booking.id)}
            >
              Cancel
            </button>
          </div>
        );
      });

  return (
    <div className={styles.resp}>
      <div className={styles.bookingSelects}>
        <div className={styles.bookingOption}>
          <label>Service:</label>
          <select onChange={(e) => setServiceId(Number(e.target.value))}>
            <option key={-1} value={-1}>
              ***All***
            </option>
            {formatServices()}
          </select>
        </div>
        <div className={styles.bookingOption}>
          <label>Coach:</label>
          <select onChange={(e) => setCoachId(Number(e.target.value))}>
            <option key={-1} value={-1}>
              ***All***
            </option>
            {formatCoaches()}
          </select>
        </div>
        <div className={styles.bookingOption}>
          <label>Client:</label>
          <select onChange={(e) => setClientId(Number(e.target.value))}>
            <option key={-1} value={-1}>
              ***All***
            </option>
            {formatClients()}
          </select>
        </div>
        <div className={styles.bookingOption}>
          <label>Date:</label>
          <select onChange={(e) => setDate(String(e.target.value))}>
            <option key={-1} value={'all'}>
              ***All***
            </option>
            {formatDate()}
          </select>
        </div>
      </div>
      <div className={styles.bookingContainer}>{findBooking()}</div>
    </div>
  );
};

export default Booking;
