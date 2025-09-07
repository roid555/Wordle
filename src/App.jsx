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
          return;

        case e.key === "Enter":
          getGuess();
          return;

        case /^[a-zA-Z]$/.test(e.key):
          rowRef.current[currentRow].getInputs().current[currentCol].innerText =
            e.key;
          return;
      }

      console.log(e.key);
      console.log(/^[a-zA-Z]$/.test(e.key));
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    }
  }

  function getGuess() {
    let guess = rowRef.current[currentRow]
      .getInputs()
      .current.map((l) => {
        l.value;
        console.log(l.value);
      })
      .join("")
      .toUpperCase();
    console.log(guess);
    return guess;
  }

  return (
    <>
      <div className="attempt-container" onClick={() => console.log("click")}>
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
