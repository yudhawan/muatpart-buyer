import * as React from "react";

export function CustomTextArea({
  maxLength = 200,
  errorMessage = "",
  onChange,
  onBlur,
}) {
  const [value, setValue] = React.useState("");
  const [charCount, setCharCount] = React.useState(0);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setCharCount(newValue.length);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    onBlur?.(value);
  };

  return (
    <div className="relative flex flex-col font-medium leading-tight text-black min-w-[362px]">
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={maxLength}
        className="px-3 py-2 w-full bg-white rounded-md border resize-none border-neutral-600 border-solid outline-none focus:border-primary-700"
      />
      <div className="flex justify-between mt-1">
        <span className="text-error-400">{errorMessage}</span>
        <span className="text-gray-500">
          {charCount}/{maxLength}
        </span>
      </div>
    </div>
  );
}
