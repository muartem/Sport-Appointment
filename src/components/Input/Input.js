import React from "react";
import classNames from 'classnames';

import "./input.css";

const Input = (props) => {
    return (
      <div className="omrs-input-group">
        <label className={classNames("omrs-input-underlined", {"omrs-input-danger": props.error})}>
          <input
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.defaultValue}
            style={props.style}
          />
          <span className="omrs-input-label">{props.name}</span>
            <span className="omrs-input-helper">{props?.error}</span>
        </label>
      </div>
    );
}

export default Input;
