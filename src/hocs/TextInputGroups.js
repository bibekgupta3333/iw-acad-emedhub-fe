import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  diabled,
  type,
  onChange,
  required,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor="name">{label}: </label>
      <input
        type={type}
        name={name}
        className={classnames(`form-control`, {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        diabled={diabled}
        required={required}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  diabled: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextInputGroup.defaultProps = {
  type: "text",
  diabled: "",
  required: "",
};

export default TextInputGroup;
