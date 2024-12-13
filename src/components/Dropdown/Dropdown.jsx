'use client'
import React, { useState, useRef, useEffect, forwardRef, useMemo } from "react"
import PropTypes from "prop-types"
import IconComponent from "../IconComponent/IconComponent"
import style from "./Dropdown.module.scss"
// import "./Dropdown.css"
import DatePicker from "react-datepicker"
import { formatDateAPI, formatDateFE } from "@/libs/services"
import Checkbox from "../Checkbox/Checkbox"
const Dropdown = forwardRef(
  (
    {
      options:pilihan = [],
      optionsOther:pilihanLain=[],
      optionsOtherText='',
      classname,
      onSearchValue,
      onSelected = () => {},
      selectedIconElement,
      placeholder = "Select value",
      searchPlaceholder = "Search...",
      showDropdown = false,
      isMultipleSelected = false,
      onCustom,
      textCustom,
      defaultValue,
      dateStartEnd,
      defaultShow='',
      fixedPlaceholder
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(showDropdown)
    const [selected, setSelected] = useState([])
    const [search, setSearch] = useState("")
    const [options,setOptions]=useState([])
    const [optionsOther,setOptionsOther]=useState([])
    // tanggal
    const [datepicker, setDatepicker] = useState(false)
    const [dateRange, setDateRange] = useState(dateStartEnd || [null, null])
    const [startDate, endDate] = dateRange

    useEffect(()=>{
      if(pilihan?.length) setOptions(pilihan)
    },[pilihan])
    useEffect(()=>{
      if(pilihanLain?.length) setOptionsOther(pilihanLain)
    },[pilihanLain])
    useEffect(() => {
      setIsOpen(showDropdown)
    }, [onCustom])
    useEffect(() => {
      setIsOpen(false)
    }, [datepicker])
    
    useEffect(() => {
      if (dateRange[1] !== null) {
        onSelected(dateRange.map((item) => formatDateAPI(item)))
        setDatepicker(false)
        setIsOpen(false)
      }
    }, [dateRange])

    const dropdownRef = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false)
          // setDatepicker(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () =>
        document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleToggle = () => {
      setIsOpen(!isOpen)
    }
    const handleSelect = (option) => {
      if (selected.filter((item) => item.value == option.value).length) {
        if (isMultipleSelected) {
          const val = selected.filter((item) => item.value !== option.value)
          setSelected(val)
          onSelected(val)
        } else {
          setSelected([option])
          onSelected([option])
          setIsOpen(false)
          setSearch("")
        }
      } else {
        if (isMultipleSelected) {
          const val = selected.length?[...selected,option]:[option]
          setSelected(val)
          onSelected(val)
        } else {
          setSelected([option])
          onSelected([option])
          setIsOpen(false)
          setSearch("")
        }
      }
    }

    const handleSearch = (e) => {
      setSearch(e.target.value)
      onSearchValue(e.target.value)
    }
    const searchBy = search?[...options,...optionsOther]?.filter((val) =>
      val.name?.toLowerCase().includes(search.toLowerCase())
    ):options?.filter((val) =>
        val.name?.toLowerCase().includes(search.toLowerCase())
      )
    useEffect(() => {
      if (defaultValue?.length) setSelected(defaultValue)
    }, [defaultValue])
    const RenderDropDown = useMemo(()=>{
      return <ul className={style.listOptions}>
      {searchBy.map((val, index) => (
        <li
          className={`${style.list} select-none`}
          key={index}
          onClick={(e) =>{
              if(!isMultipleSelected){
                val.value == "tanggal"
                ? setDatepicker(true)
                : handleSelect({ value: val.value, name: val.name, title:val.title || '' })
              }else{
                e.preventDefault()
                handleSelect({ value: val.value, name: val.name, title:val.title || '' })
              }
            }
          }
        >
          {
            isMultipleSelected&&<Checkbox classname={style.checkBox} label="" value={val.value} checked={selected.filter((a) => a.value === val.value).length} />
          }
          <span className={style.content}>
            {val?.title && (
              <span className="font-[600] leading-[14px]">
                {val?.title}
              </span>
            )}
            <span className="font-[500]">{val?.name}</span>
          </span>
          {(!!selected.filter((a) => a.value === val.value).length && !isMultipleSelected) && (
            <IconComponent src={"/icons/check-circle.svg"} />
          )}
        </li>
      ))}
      {
        optionsOther.length && !search?<>
          <span className={`${style.list} select-none border-y border-neutral-400 cursor-default hover:unset`}>{optionsOtherText?optionsOtherText:'Opsi Lainnya'}</span>
          {
            optionsOther?.map(val=>{
              return <li 
                className={`${style.list} select-none ter`} 
                key={val.name}
                onClick={(e) =>{
                    if(!isMultipleSelected){
                      val.value == "tanggal"
                      ? setDatepicker(true)
                      : handleSelect({ value: val.value, name: val.name, title:val.title || '' })
                    }else{
                      e.preventDefault()
                      handleSelect({ value: val.value, name: val.name, title:val.title || '' })
                    }
                  }
                } >
                {
                  isMultipleSelected&&<Checkbox classname={style.checkBox} label="" value={val.value} checked={selected.filter((a) => a.value === val.value).length} />
                }
                <span className={style.content}>
                  {val?.title && (
                    <span className="font-[600] leading-[14px]">
                      {val?.title}
                    </span>
                  )}
                  <span className="font-[500]">{val?.name}</span>
                </span>
              </li>
            })
          }
        </>:''
      }
      {searchBy.length === 0 && (
        <li className="p-2 text-center text-[12px] select-none">
          Data Tidak Ditemukan
        </li>
      )}
    </ul>
    },[searchBy])
    const labelName = fixedPlaceholder?placeholder: selected?.map((val) => {
      if(defaultShow) return val[defaultShow]
      if(val.title) return val.title
      return val.name
    }).join(", ")
    return (
      <>
        <div ref={dropdownRef} className={`${style.main} ${classname}`}>
          <button
            ref={ref}
            onClick={handleToggle}
            className={`${style.buttonPlace} ${
              !selected.length && "!text-neutral-600"
            } select-none`}
          >
            {isMultipleSelected && selected.length && !fixedPlaceholder > 1 ? (
              <span className="flex gap-[2px]">
                {selected[0]?.title?selected[0]?.title:selected[0]?.name}
                <span className="bg-neutral-600 rounded-full text-neutral-50 px-1">
                  {selected.length - 1}+
                </span>
              </span>
            ) : labelName?.length ? (
              labelName
            ) : (dateRange[1] !== null)&&!fixedPlaceholder ? (
              <span className="text-[12px] text-neutral-600 font-semibold">{`${formatDateFE(
                dateRange[0]
              )} - ${formatDateFE(dateRange[1])}`}</span>
            ) : (
              <span className="text-[12px] text-neutral-600">
                {placeholder}
              </span>
            )}
            <IconComponent
              src={selectedIconElement ?? '/icons/chevron-down.svg'}
              color="default"
              classname={`${style.chevron} ${
                isOpen ? style.chevronRotate : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className={style.listContainer}>
              {onSearchValue && (
                <div className="h-[32px] border border-neutral-500 rounded flex items-center py-2 px-3 ">
                  <IconComponent src={"/icons/search.svg"} />
                  <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder={searchPlaceholder}
                    className={`w-full h-full outline-none focus:outline-none rounded py-2 px-3 text-[12px] flex-1 text-neutral-900 placeholder:text-neutral-700`}
                  />
                  {search && (
                    <IconComponent
                      src={"/icons/silang.svg"}
                      onclick={(e) => setSearch("")}
                    />
                  )}
                </div>
              )}
              {onCustom && (
                <div 
                onClick={onCustom} className="flex cursor-pointer w-full justify-start items-center gap-2 border-b border-neutral-400 pb-3">
                  <IconComponent
                    src={"/icons/Plus.svg"}
                    width={14}
                    height={14}
                    classname={style.customIcon}
                  />
                  <span className="text-neutral-900 text-[12px]">
                    {textCustom}
                  </span>
                </div>
              )}
              {
                RenderDropDown
              }
            </div>
          )}
        </div>
        {datepicker && (
          <DatePicker
            // set value yang terpilih
            inline
            selectsRange={true}
            // withPortal
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update)
            }}
          />
        )}
      </>
    )
  }
)

export default Dropdown
Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  children: PropTypes.element,
  onSearchValue: PropTypes.func,
  selectedIconElement: PropTypes.element,
  searchPlaceholder: PropTypes.string,
  showDropdown: PropTypes.bool,
  getShowIndicator: PropTypes.func,
  placeholder: PropTypes.string,
  onSelected: PropTypes.func,
  isNotEmpty: PropTypes.bool,
  isMultipleSelected: PropTypes.bool,
  onCustom: PropTypes.func,
  textCustom: PropTypes.string,
  defaultValue: PropTypes.shape(PropTypes.object),
  defaultShow:PropTypes.oneOf(['title','name']),
  fixedPlaceholder: PropTypes.bool
};
