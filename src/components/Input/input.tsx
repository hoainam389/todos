import "./input.scss";
import { useCallback } from "react";
import { InputProps } from "./input.type";

const Input = ({
  placeholder = "",
  defaultValue = "",
  onSubmit,
  onBlur,
}: InputProps) => {
  console.log("Input re-render");

  const handleBlur = useCallback(() => {
    onBlur?.();
  }, [onBlur]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = (e.target as HTMLInputElement).value.trim();

        if (value?.length < 1) return;

        onSubmit?.(value);
        (e.target as HTMLInputElement).value = "";
      }
    },
    [onSubmit]
  );

  return (
    <div className="input__container">
      <input
        className="input"
        type="text"
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Input;
