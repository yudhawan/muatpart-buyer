import * as React from "react";

export function SearchInput({ onSearch, label }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className="flex gap-2.5 items-center p-2.5 w-full text-neutral-500">
      <div className="flex flex-1 shrink gap-2 items-center self-stretch px-3 py-2 my-auto w-full bg-white rounded-md border border-solid basis-0 border-neutral-500 min-h-[32px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/70871e842982c4b2c298965e832abba484c3108d67ca5660d0ab82905d412110?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
        />
        <input
          id="dropdownSearch"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={"Cari " + label}
          className="flex-1 shrink self-stretch my-auto basis-0 bg-transparent border-none outline-none"
        />
      </div>
    </div>
  );
}
