"use client";
import React, { forwardRef, useState } from "react";
import style from "./Input.module.scss";
import PropTypes from "prop-types";
import IconComponent from "../IconComponent/IconComponent";

const Input = ({
  name,
  type = "text",
  placeholder = "Placeholder",
  disabled = false,
  status = null,
  icon = { left: "", right: "" },
  text = { left: "", right: "" },
  supportiveText = { title: "", desc: "" },
  width = { width: "", maxWidth: "", minWidth: "" },
  classInput,
  changeEvent = () => {},
  focusEvent = () => {},
  blurEvent = () => {},
  classname,
  ...props
}) => {
  return (
    <div
      className={`flex flex-col gap-[4px] inputClassName ${classname}`}
      style={{
        width: width.width,
        maxWidth: width.maxWidth,
        minWidth: width.minWidth,
      }}
    >
      <div
        className={`flex w-full p-12 gap-[8px] ${
          disabled && style.input_disabled
        } ${style.input_style}
        ${
          status == "error"
            ? style.border_red
            : status == "success"
            ? style.border_success
            : ""
        }`}
      >
        {typeof icon.left === "string" ? (
          <IconComponent
            loader={false}
            src={{ src: icon.left }}
            height={16}
            width={16}
            classname={
              status == "error"
                ? style.icon_danger
                : status == "success"
                ? style.icon_success
                : ""
            }
          />
        ) : (
          icon.left
        )}
        {text.left}
        <input
          {...props}
          type={type}
          onChange={changeEvent}
          onFocus={focusEvent}
          onBlur={blurEvent}
          name={name}
          placeholder={placeholder}
          className={`grow ${classInput} ${style.input}`}
          disabled={disabled}
        />
        {typeof icon.right === "string" ? (
          <IconComponent
            loader={false}
            src={{ src: icon.right }}
            height={16}
            width={16}
            classname={
              status == "error"
                ? style.icon_danger
                : status == "success"
                ? style.icon_success
                : ""
            }
          />
        ) : (
          icon.right
        )}
        {text.right}
      </div>
      {(supportiveText.title || supportiveText.desc) && (
        <div
          className={`flex justify-between ${style.supportive_text}
          ${
            status == "error"
              ? style.text_danger
              : status == "success"
              ? style.text_success
              : ""
          }`}
        >
          <span>{supportiveText.title}</span>
          <span>{supportiveText.desc}</span>
        </div>
      )}
    </div>
  );
};

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "email", "password"]),
  name: PropTypes.string,
  supportiveText: PropTypes.string,
  disabled: PropTypes.bool,
  status: PropTypes.oneOf(["success", "error"]),
  icon: PropTypes.object,
  text: PropTypes.object,
  supportiveText: PropTypes.object,
  width: PropTypes.object,
};
