import React, { useState, useDeferredValue } from "react";

interface Props {
  className?: string;
  onChange: (value: string) => void;
}

const InputFilter = (props: Props) => {
  const [filterText, setFilterText] = useState("");
  const deferredFilterText = useDeferredValue(filterText)

  return (
    <div>
      <input
        className={props.className}
        type="text"
        placeholder="filter news..."
        value={filterText}
        onChange={e => {
          const { value } = e.target;
          setFilterText(value);
          props.onChange(deferredFilterText);
        }}
      />
    </div>
  );
};
export default InputFilter;
