import React from "react";
import "./input.css";

class Input extends React.Component {
  render() {
    return (
      <div className="omrs-input-group">
        <label className="omrs-input-underlined">
          <input
            type={this.props.type}
            name={this.props.name}
            onChange={this.props.onChange}
            value={this.props.defaultValue}
            style={this.props.style}
          />
          <span className="omrs-input-label">{this.props.name}</span>
        </label>
      </div>
    );
  }
}

export default Input;
