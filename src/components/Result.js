import React, { useMemo } from "react";

const Checkbox = ({ year, result, handleChange }) => {
  const getEnding = useMemo(() => {
    const lastInt = parseInt(year.toString().split('').pop());
    switch (true) {
      case lastInt === 2 || lastInt === 6 || lastInt === 7 || lastInt === 8:
        return "ой";
      case lastInt === 3:
        return "ий";
      default:
        return "ый";
    }
  }, [year]);

  return (
    <label className="result__label">
      <input
        type="checkbox"
        name="one"
        onChange={handleChange}
        className="form-check-input"
      />
      <span className="result__checkmark"></span>
      <span className="result__text">
        <span className="black">{result} рублей</span> в{year === 2 ? 'o' : ''} {year}-{getEnding} год
      </span>
    </label>
  );
};

const Result = ({ results }) => {
  const handleChange = () => {
    // do something
  };

  return (
    <div className="result">
      <p>Итого можете внести в качестве досрочных:</p>
      <form>
        {results.length &&
          results.map((result, index) => {
            return (
              <Checkbox
                key={`res${index}`}
                result={result}
                handleChange={handleChange}
                year={index + 1}
              />
            );
          })}
      </form>
    </div>
  );
};

export default Result;
