import React, { useState, useCallback, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import CurrencyInput from "./CurrencyInput";
import Result from "./Result";
import {
  MAX_DEDUCTION,
  MONTH_MUNBER,
  VAT,
  CLASS_OVERLAY,
  CLASS_ACTIVE,
} from "../common/constants";

const Popup = ({ visible, handleClick }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [results, setResults] = useState(null);

  const inputRef = useRef();

  const handleFocus = useCallback(() => {
    setValue("");
  }, []);

  const handleValueChange = useCallback((val) => {
    setError(false);
    setValue(val);
  }, []);

  useEffect(() => {
    if (!visible) {
      setValue("");
      setResults(null);
    } else {
    }
  }, [visible]);

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();

      if (!value) {
        setError(true);
        return;
      }

      const annDeduction = value * MONTH_MUNBER * VAT;
      const fullYearNum = Math.trunc(MAX_DEDUCTION / annDeduction);
      const remainder = MAX_DEDUCTION % annDeduction;

      const setValueDisplay = (num) => {
        return num.toLocaleString("ru-RU", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
      };

      setResults([
        ...new Array(fullYearNum).fill(setValueDisplay(annDeduction)),
        setValueDisplay(remainder),
      ]);

      inputRef.current.blur();
    },
    [value]
  );

  return (
    <div className={visible ? CLASS_OVERLAY + CLASS_ACTIVE : CLASS_OVERLAY}>
      <div className="popup">
        <h2 className="title">Налоговый вычет</h2>

        <p className="text">
          Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер
          налогового вычета составляет не более 13% от своего официального
          годового дохода.
        </p>

        <div className="currency">
          <p className="subtitle currency__subtitle">Ваша зарплата в месяц</p>
          <form onSubmit={handleSubmit}>
            <CurrencyInput
              handleValueChange={handleValueChange}
              value={value}
              error={error}
              handleFocus={handleFocus}
              inputRef={inputRef}
            />
            <button type="submit" aria-label="calculate" className="calc-btn">
              Расчитать
            </button>
          </form>
        </div>

        {results && <Result results={results} />}

        <div className="reduce">
          <p className="subtitle">Что уменьшаем?</p>
          <button
            type="button"
            className="button button--rounded button--red"
            aria-label="reduce payment"
          >
            Платеж
          </button>
          <button
            type="button"
            className="button button--rounded button--gray"
            aria-label="reduce term"
          >
            Срок
          </button>
        </div>

        <button
          type="button"
          className="popup__button button button--normal button--red"
          aria-label="add payment"
        >
          Добавить
        </button>

        <button
          type="button"
          className="close-btn"
          aria-label="close popup"
          onClick={handleClick}
        >
          <MdClose size={22} />
        </button>
      </div>
    </div>
  );
};

export default Popup;
