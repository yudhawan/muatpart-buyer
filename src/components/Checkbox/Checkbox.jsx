"use client";

import style from "./Checkbox.module.scss";
import PropTypes from "prop-types";

const Checkbox = ({
  onChange = () => {},
  label = "label",
  value,
  disabled,
  children,
  checked = false,
  classname,
  ...props
}) => {
  const handleChange = (e) => {
    e.stopPropagation();
    if (disabled) return;

    onChange({
      checked: !checked,
      value,
    });
  };

  const handleClick = () => {
    if (disabled) return;

    onChange({
      checked: !checked,
      value,
    });
  };

  return (
    <div
      className={`${style.container_checkbox} flex gap-[8px] items-center ${classname}`}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        checked={checked}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <span className={`${style.checkbox_primary}`}></span>
      <span className="select-none">{children ? children : label}</span>
    </div>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  classname: PropTypes.string,
};

export default Checkbox;
