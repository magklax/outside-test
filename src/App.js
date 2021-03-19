import React, { useState, useCallback } from "react";
import MainButton from "./components/MainButton";
import Popup from "./components/Popup";

function App() {
  const [visible, setVisible] = useState(false);

  const popupOpenHandler = useCallback(() => setVisible(true), []);
  const popupCloseHandler = useCallback(() => setVisible(false), []);

  return (
    <div className="container">
      <Popup visible={visible} handleClick={popupCloseHandler} />
      <MainButton handleClick={popupOpenHandler} />
    </div>
  );
}

export default App;
