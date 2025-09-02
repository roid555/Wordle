import { div } from "framer-motion/client";
import "./myRow.css";
import React, { useRef } from "react";
const LETTER_IN_WORD = 5;

const MyRow = () => {
  const inputs = useRef([]);

  function handleChange(e, index) {
    index < LETTER_IN_WORD - 1 ? inputs.current[index + 1].focus() : null;
  }

  return (
    <div className="row-container">
      {[...Array(5)].map((_, index) => (
        <input
          className="letter-box"
          key={index}
          type="text"
          maxLength={1}
          ref={(e) => (inputs.current[index] = e)}
          onChange={(e) => handleChange(e, index)}
        ></input>
      ))}
    </div>
  );
};

export default MyRow;
