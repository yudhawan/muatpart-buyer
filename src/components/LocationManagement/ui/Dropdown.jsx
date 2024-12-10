import * as React from "react";
import { DropdownItem } from "./DropdownItem";
import { SearchInput } from "./SearchInput";

export function Dropdown({
  items = [],
  defaultSelected,
  onChange,
  label = "Opsi",
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(
    defaultSelected || null
  );
  const [filteredItems, setFilteredItems] = React.useState(items);
  const dropdownRef = React.useRef(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    onChange?.(item);
    setIsOpen(false);
    setFilteredItems(items);
  };

  const handleSearch = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-col font-medium leading-tight text-black min-w-[362px]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between gap-2 items-center px-3 py-2 w-full bg-white rounded-md border border-neutral-600 border-solid min-h-[32px] focus:border-primary-700"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div
          className={`shrink self-stretch my-auto ${
            selectedItem ? "text-black" : "text-gray-500"
          }`}
        >
          {selectedItem ? selectedItem : "Pilih " + label}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/06843b3dd1782b59490bb7e10654d2d9a2885a27f7c62b14cef7cfe5db88e0dd?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
          alt=""
          className={`object-contain shrink-0 self-stretch my-auto w-4 aspect-square transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full flex overflow-hidden mt-9 bg-white rounded-md border border-solid shadow-sm border-primary-700 z-10">
          <div className="flex flex-col my-auto w-full">
            <SearchInput onSearch={handleSearch} label={label} />
            <div
              role="listbox"
              aria-label="Dropdown items"
              className="overflow-y-auto max-h-40"
            >
              {selectedItem && (
                <DropdownItem
                  key={selectedItem}
                  item={selectedItem}
                  isSelected={true}
                  onSelect={() => handleItemSelect(selectedItem)}
                />
              )}
              {filteredItems.length > 0 ? (
                filteredItems
                  .filter((item) => item !== selectedItem)
                  .map((item) => (
                    <DropdownItem
                      key={item}
                      item={item}
                      isSelected={item === selectedItem}
                      onSelect={() => handleItemSelect(item)}
                    />
                  ))
              ) : (
                <div className="p-2 text-center text-gray-500">
                  Data yang Anda cari tidak ditemukan
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
