import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";

class Nav extends Component {
  render() {
    const linkStyle = {
      textDecoration: "none",
      color: "#c4c4c4",
    };

    return (
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <Link to="./" style={linkStyle}>
            <li>Services</li>
          </Link>
          <Link to="./coaches" style={linkStyle}>
            <li>Coaches</li>
          </Link>
          <Link to="./clients" style={linkStyle}>
            <li>Clients</li>
          </Link>
          <Link to="./slots" style={linkStyle}>
            <li>Slots</li>
          </Link>
          <Link to="./booking" style={linkStyle}>
            <li>Booking</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
