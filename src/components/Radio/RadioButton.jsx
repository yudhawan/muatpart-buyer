import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import style from "./RadioButton.module.scss";

const RadioButton = ({
  onClick = () => {},
  name,
  label,
  checked,
  onChange,
  value,
  disabled,
  children,
  classname,
  classnameRound,
  classnameLabel,
  ...props
}) => {
  const radioRef = useRef(null);
console.log("checked",name,checked)
  const isLabelMissing = !label && !children;

  const checkedClick = () => {
    if (disabled) {
      return;
    }
    onClick({
      checked: !checked,
      value,
    });
  };

  return (
    <div
      className={`${style.container_radio} ${classname} cursor-pointer flex gap-[8px] items-center`}
      onClick={checkedClick}
    >
      <input
        type="radio"
        ref={radioRef}
        checked={checked}
        name={name}
        onChange={checkedClick}
        value={value}
        disabled={disabled}
        {...props}
      />
      <span
        className={`${style.radio_primary} ${classnameRound} ${
          isLabelMissing ? `after:top-[4px]` : `after:top-[5px]`
        } select-none`}
      ></span>
      {children ? (
        children
      ) : (
        <span
          className={`text-xs text-neutral-900 font-medium ${classnameLabel}`}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
