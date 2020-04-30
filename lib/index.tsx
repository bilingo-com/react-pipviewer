import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import pipviewer from "./components/pipviewer";

const APP = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    pipviewer({ ref: videoRef });
  }, []);
  return (
    <div>
      <video
        width="600"
        height="400"
        ref={videoRef}
        src="https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4"
        poster="https://static.veer.com/veer/static/resources/keyword/2020-02-19/533ed30de651499da1c463bca44b6d60.jpg"
        controls
      ></video>
      <div style={{ height: "1000px" }}></div>
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
