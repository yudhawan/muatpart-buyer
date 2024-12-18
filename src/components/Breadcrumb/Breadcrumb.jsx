"use client";
import React from "react";
import PropTypes from "prop-types";
import style from "./BreadCrumb.module.scss";
import IconComponent from "../IconComponent/IconComponent";
// import * as Icon from "../../icons";
const BreadCrumb = ({
  data,
  onclick = () => {},
  onActive = () => {},
  classname,
  disableActive = false,
  disableClick=false,
  maxWidth,
}) => {
  function handleClick(val) {
    if(disableClick) return;
    onclick(val);
    onActive(data[data.length - 1]);
  }
  return (
    <div className={`${style.main} ${style.breadcrumb} ${classname}`}>
      {data?.map((val, idx) => {
        return (
          <div className="flex items-center gap-[5px]" key={idx}>
            <span
              style={{ maxWidth: maxWidth ? `${maxWidth}px` : "86px" }}
              className={`${style.list + " hover:text-primary-700 "} ${
                idx === data.length - 1 ? " !max-w-none" : "line-clamp-1"
              } ${disableActive ? "" : "last:text-primary-700 "} select-none ${!disableClick?'cursor-pointer':''}`}
              key={idx}
              onClick={() => handleClick(val)}
            >
              {val?.name?val.name:val}
            </span>
            {idx !== data.length - 1 && (
              <IconComponent
                src={'/icons/chevron-right.svg'}
                classname={style.Icon}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
BreadCrumb.propTypes = {
  data: PropTypes.array,
  onclick: PropTypes.func,
  onActive: PropTypes.func,
  classname: PropTypes.string,
  disableActive: PropTypes.bool,
  maxWidth: PropTypes.number,
};
