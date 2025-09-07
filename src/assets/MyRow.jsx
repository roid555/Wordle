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
    getInputs: () => inputs, // optional: parent can access inputs if needed
  }));

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputs.current[index - 1].value = "";
      inputs.current[index - 1].focus();
    } else if (
      e.key === "Enter" &&
      inputs.current[LETTER_IN_WORD - 1].value.length == 1
    ) {
      let guess = inputs.current
        .map((l) => l.value)
        .join("")
        .toUpperCase();
      checkSolution(guess, rowNum);
    } else if (/^[a-zA-Z]$/.test(e.key)) {
    } else if (e.key == "Tab") {
      e.preventDefault();
    } else {
      e.preventDefault();
    }
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
          //onSelect={(e) => handleSelect(e, index)}
          // onSelect={(e) => e.preventDefault()}
          onKeyDown={(e) => handleKeyDown(e, index)}
        ></div>
      ))}
    </div>
  );
};

export default MyRow;
