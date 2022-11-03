import React, { useState, useCallback } from "react";

// TODO: check numeric input initial value - why fcn not working?

export const useNumericInputState = (
  initialValue: number,
  parseFn?: (...params: any) => number
) => {
  const [inputValue, setInputValue] = useState<string>(initialValue.toString());

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      if (parseFn) {
        setInputValue(parseFn(event.target.value).toString());
      } else {
        setInputValue(event.target.value.toString());
      }
    },
    []
  );
  return { value: inputValue, onChange: handleInputChange };
};

export const useSwitchInputState = (initialValue?: boolean) => {
  const [inputValue, setInputValue] = useState<boolean>(initialValue || false);

  const handleSwitchToggle = useCallback(() => {
    setInputValue((prev) => !prev);
  }, []);
  return [inputValue, handleSwitchToggle];
};
