import React, { useState, useCallback } from "react";
import { validateNumericInputValue } from "../utils/inputValidation";

export const useIntegerInputState = (
  initialValue: number,
  min: number,
  max: number,
  step?: number
): [
  number,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
] => {
  const [inputValue, setInputValue] = useState<number>(initialValue);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setInputValue(
        validateNumericInputValue(
          event.target.value,
          initialValue,
          min,
          max,
          parseInt,
          step
        )
      );
    },
    [inputValue, setInputValue]
  );

  return [inputValue, handleInputChange];
};
export const useFloatInputState = (
  initialValue: number,
  min: number,
  max: number,
  step?: number
): [
  number,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
] => {
  const [inputValue, setInputValue] = useState<number>(initialValue);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setInputValue(
        validateNumericInputValue(
          event.target.value,
          initialValue,
          min,
          max,
          parseFloat,
          step
        )
      );
    },
    [inputValue, setInputValue]
  );

  return [inputValue, handleInputChange];
};

export const useSwitchInputState = (
  initialValue?: boolean
): [boolean, () => void] => {
  const [inputValue, setInputValue] = useState<boolean>(initialValue || false);

  const handleSwitchToggle = useCallback(() => {
    setInputValue((prev) => !prev);
  }, []);
  return [inputValue, handleSwitchToggle];
};
