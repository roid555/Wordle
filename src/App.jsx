import { useState, useRef } from "react";
import "./App.css";
import MyRow from "./assets/myRow.jsx";
import "./constants.js";
import { PLAYER_ATTEMPTS, LETTER_IN_WORD } from "./constants";

function App() {
  const [solution, setSolution] = useState("REACT");
  const rowRef = useRef([]);

  function checkSolution(guess, rowNum) {
    const inputsRefs = rowRef.current[rowNum].getInputs();
    for (let i = 0; i < LETTER_IN_WORD; i++) {
      if (guess[i] === solution[i]) {
        inputsRefs.current[i].classList.add("correct");
      } else if (solution.includes(guess[i])) {
        inputsRefs.current[i].classList.add("close");
      } else inputsRefs.current[i].classList.add("wrong");
    }
    if (guess === solution) {
      console.log("win");
      return;
    } else if (rowRef.current[rowNum + 1]) {
      console.log(rowNum);
      rowRef.current[rowNum + 1].focusFirst();
    }
  }

  return (
    <>
      <div className="attempt-container">
        {[...Array(PLAYER_ATTEMPTS)].map((_, index) => (
          <MyRow
            key={index}
            rowNum={index}
            checkSolution={checkSolution}
            ref={(e) => (rowRef.current[index] = e)}
          ></MyRow>
        ))}
      </div>
    </>
  );
}

export default App;
