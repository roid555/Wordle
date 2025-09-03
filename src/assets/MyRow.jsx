import { div } from "framer-motion/client";
import "./myRow.css";
import React, { useRef } from "react";
const LETTER_IN_WORD = 5;

const MyRow = () => {
  const inputs = useRef([]);
  const solution = "REACT";

  function handleKeyDown(e, index) {
    if (e.target.value.length === 1) {
      index < LETTER_IN_WORD - 1 ? inputs.current[index + 1].focus() : null;
    }
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputs.current[index - 1].value = "";
      inputs.current[index - 1].focus();
    }
    if (e.key === "Enter" && index === LETTER_IN_WORD - 1) {
      checkSolution();
    }
  }
  function checkSolution() {
    let guess = inputs.current
      .map((l) => l.value)
      .join("")
      .toUpperCase();

    for (let i = 0; i < LETTER_IN_WORD; i++) {
      if (guess[i] === solution[i]) {
        inputs.current[i].classList.add("correct");
      } else if (solution.includes(guess[i])) {
        inputs.current[i].classList.add("close");
      } else inputs.current[i].classList.add("wrong");
    }
    if (guess === solution) {
      console.log("win");
      return;
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
          onSelect={(e) => handleSelect(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        ></input>
      ))}
    </div>
  );
};

export default MyRow;
