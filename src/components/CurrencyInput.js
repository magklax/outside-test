import React, { useCallback } from "react";
import {
  VALID_FIRST,
  VALID_NEXT,
  DELETE_KEY_CODE,
  LIMIT,
  CLASS_SALARY,
  CLASS_ERROR,
} from "../common/constants";

const CurrencyInput = ({
  value,
  handleValueChange,
  handleFocus,
  error,
  inputRef,
}) => {
  const handleKeyDown = useCallback(
    (evt) => {
      const { key, keyCode } = evt;
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return;
      }

      // const valueString = value.toString();
      let position = inputRef.current.selectionStart;
      const begValueString = value.toString().slice(0, position);
      const endValueString = value.toString().slice(position);

      let nextValue;

      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString =
          value === 0 ? key : `${begValueString}${key}${endValueString}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = begValueString.slice(0, -1) + endValueString;
        nextValue =
          nextValueString === "" ? 0 : Number.parseInt(nextValueString, 10);
      }

      if (nextValue > LIMIT) {
        return;
      }

      handleValueChange(nextValue);

    },
    [handleValueChange, value, inputRef]
  );

  const handleChange = useCallback(() => {}, []);

  const valueDisplay = value.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <label className={error ? CLASS_SALARY + CLASS_ERROR : CLASS_SALARY}>
      <input
        placeholder="Введите данные"
        inputMode="numeric"
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={valueDisplay}
        ref={inputRef}
      />
      <span className="hint">Поле обязательно для заполнения</span>
    </label>
  );
};

export default CurrencyInput;
