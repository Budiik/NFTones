import React from "react";
import Header from "./components/js/Header/Header";
import Canvas from "./components/js/Main/ProjectionPlane";

function App() {
  const { render, rot } = Header()
  return (
    <>
      {render}
      <Canvas rotation={rot}></Canvas>
    </>
  );
}

export default App;
