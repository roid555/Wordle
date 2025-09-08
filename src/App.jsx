import { useState, useRef, useEffect } from "react";
import "./App.css";
import MyRow from "./assets/myRow.jsx";
import "./constants.js";
import { PLAYER_ATTEMPTS, LETTER_IN_WORD } from "./constants";

function App() {
  const [solution, setSolution] = useState("REACT");
  const rowRef = useRef([]);
  let currentRow = 0;
  let currentCol = 0;
  let activeBox = [currentRow, currentCol];

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (true) {
        case e.key === "Backspace":
          rowRef.current[currentRow].getInputs().current[currentCol].innerText =
            "";
          if (currentCol > 0) currentCol -= 1;
          break;

        case e.key === "Enter" && currentCol === LETTER_IN_WORD - 1:
          checkSolution(rowRef.current[currentRow].getGuess());
          return;

        case /^[a-zA-Z]$/.test(e.key):
          rowRef.current[currentRow].getInputs().current[currentCol].innerText =
            e.key;
          if (currentCol < LETTER_IN_WORD - 1) currentCol++;
          return;
        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentCol]);

  function checkSolution(guess) {
    const inputsRefs = rowRef.current[currentRow].getInputs();
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
    } else if (currentRow === PLAYER_ATTEMPTS - 1) {
      console.log("lose");
    } else {
      currentRow++;
      currentCol = 0;
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
