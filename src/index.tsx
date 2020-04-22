import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import pipviewer from "./components/pipviewer";

const APP = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    pipviewer(videoRef, {});
  }, []);
  return (
    <div>
      <video
        ref={videoRef}
        src={require("./assets/1.mp4")}
        poster={require("./assets/1.png")}
        controls
      ></video>
      <div style={{ height: "10000px" }}></div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <APP />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
