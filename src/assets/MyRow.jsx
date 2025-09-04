import { div } from "framer-motion/client";
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
    focusFirst: () => {
      if (inputs.current[0]) {
        inputs.current[0].focus();
      }
    },
    getInputs: () => inputs, // optional: parent can access inputs if needed
  }));

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

  function handleKeyDown(e, index) {
    console.log(e.key);
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
        <input
          className="letter-box"
          key={index}
          type="text"
          maxLength={1}
          ref={(e) => (inputs.current[index] = e)}
          onSelect={(e) => handleSelect(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        ></input>
      ))}
    </div>
  );
};

export default MyRow;
