import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyRow from "./assets/myRow.jsx";

function App() {
  const [solution, setSolution] = useState("REACT");

  return (
    <>
      <div className="attempt-container">
        <MyRow></MyRow>
        <MyRow></MyRow>
        <MyRow></MyRow>
        <MyRow></MyRow>
        <MyRow></MyRow>
        <MyRow></MyRow>
      </div>
    </>
  );
}

export default App;
