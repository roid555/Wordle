import "./myRow.css";
import React, { useRef, useImperativeHandle } from "react";
import { PLAYER_ATTEMPTS, LETTER_IN_WORD } from "../constants";

const MyRow = ({
  rowNum = rowNum,
  checkSolution = checkSolution,
  ref = ref,
}) => {
  const inputs = useRef([]);

  useImperativeHandle(ref, () => ({
    getInputs: () => inputs,
    getGuess: () => getGuess(),
  }));

  function getGuess() {
    let guess = inputs.current
      .map((l) => l.innerText)
      .join("")
      .toUpperCase();
    return guess;
  }

  return (
    <div ref={ref} className="row-container">
      {[...Array(LETTER_IN_WORD)].map((_, index) => (
        <div
          className="letter-box"
          key={index}
          type="text"
          maxLength={1}
          ref={(e) => (inputs.current[index] = e)}
        ></div>
      ))}
    </div>
  );
};

export default MyRow;
