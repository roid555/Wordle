import { div } from "framer-motion/client";
import "./myRow.css";
import React, { useRef } from "react";
const LETTER_IN_WORD = 5;

const MyRow = () => {
  const inputs = useRef([]);

  function handleChange(e, index) {
    if (e.target.value.length === 1) {
      index < LETTER_IN_WORD - 1 ? inputs.current[index + 1].focus() : null;
    }
    if (e.key === "Backspace" && e.target.value.length === 0) {
      index > 0 ? inputs.current[index - 1].focus() : null;
    }
  }

  function handleSelect(e, index) {
    while (index > 0 && inputs.current[index - 1].value.length === 0) {
      inputs.current[index - 1].focus();
      index--;
    }
    while (
      index < LETTER_IN_WORD - 1 &&
      inputs.current[index].value.length === 1
    ) {
      inputs.current[index + 1].focus();
      index++;
    }
  }

  return (
    <div className="row-container">
      {[...Array(LETTER_IN_WORD)].map((_, index) => (
        <input
          className="letter-box"
          key={index}
          type="text"
          maxLength={1}
          ref={(e) => (inputs.current[index] = e)}
          onChange={(e) => handleChange(e, index)}
          onSelect={(e) => handleSelect(e, index)}
          onKeyDown={(e) => handleChange(e, index)}
        ></input>
      ))}
    </div>
  );
};

export default MyRow;
