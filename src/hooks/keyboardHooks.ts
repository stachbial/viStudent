import { useEffect } from "react";

export const useDialogKeyboard = (
  onEnter: () => void,
  onEscape: () => void
) => {
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Enter") onEnter();
      if (e.key === "Escape") onEscape();
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);
};
