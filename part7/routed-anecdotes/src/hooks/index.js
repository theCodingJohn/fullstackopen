import { useState } from "react";

export const useField = (name, type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  const obj = {
    name,
    type,
    value,
    onChange,
    reset,
  };

  return obj;
};
