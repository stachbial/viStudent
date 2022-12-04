import React, { useState, useCallback } from "react";
import { validateNumericInputValue } from "../utils/inputValidation";

export const useIntegerInputState = (
  initialValue: number,
  min: number,
  max: number,
  step?: number
): [
  number,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  (forcedValue: string) => void
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

  const handleForcedInputChange = useCallback(
    (forcedValue: string) => {
      setInputValue(
        validateNumericInputValue(
          forcedValue,
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

  return [inputValue, handleInputChange, handleForcedInputChange];
};
export const useFloatInputState = (
  initialValue: number,
  min: number,
  max: number,
  step?: number
): [
  number,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  (forcedValue: string) => void
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

  const handleForcedInputChange = useCallback(
    (forcedValue: string) => {
      setInputValue(
        validateNumericInputValue(
          forcedValue,
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

  return [inputValue, handleInputChange, handleForcedInputChange];
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

export const useSelectInputState = (
  initialValue: string
): [
  string,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
] => {
  const [inputState, setInputState] = useState<string>(initialValue);

  const handleSelectInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();
      setInputState(event.target.value);
    },
    [inputState, setInputState]
  );

  return [inputState, handleSelectInputChange];
};
