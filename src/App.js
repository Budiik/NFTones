import React from "react";
import Header from "./components/js/Header/Header";
import Canvas from "./components/js/Main/ProjectionPlane";

function App() {
  const { render, rot } = Header() // Gets rotation changes from buttons and header(render)
  return (
    <>
      {render}
      <Canvas rotation={rot}></Canvas>
    </>
  );
}

export default App;
