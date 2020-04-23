import React, { useEffect, useRef, useState, RefObject } from "react";
import ReactDOM from "react-dom";
import useInViewport from "../../hooks/useInViewport";
import useVideoState from "../../hooks/useVideoState";
import Portal from "../protal";
import Overlay from "./overlay";

import "./index.scss";
import useHover from "../../hooks/useHover";

const PIPVERWER_ZINDEX = 9999;

interface PlayerProps {
  videoPlayer?: React.ReactNode;
  videoRef: RefObject<HTMLVideoElement>;
  visible?: boolean;
  afterClose?: () => void;
}

const Player = (props: PlayerProps) => {
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const pipViewerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(props.visible);
  const [videoInfo, setVideoInfo] = useState<any>({});
  const { isInviewport } = useInViewport(props.videoRef);
  const videoState = useVideoState(pipVideoRef);

  useEffect(() => {
    setVisible(!isInviewport);
  }, [visible, isInviewport]);

  useEffect(() => {
    if (props.videoRef.current) {
      const $el = props.videoRef.current;
      setVideoInfo({
        src: $el.getAttribute("src"),
        poster: $el.getAttribute("poster"),
      });
    }
  }, [props.videoRef]);

  return (
    <Portal>
      <div
        className="pipviewer-container"
        ref={pipViewerRef}
        style={{ display: visible ? "flex" : "none" }}
      >
        <video
          ref={pipVideoRef}
          className="pip-video"
          src={videoInfo.src}
          poster={videoInfo.poster}
        ></video>
        <div className="layer-wrapper">
          <Overlay videoState={videoState} videoEl={pipVideoRef} />
        </div>
      </div>
    </Portal>
  );
};

interface IPipviewerOptions {}

export default function pipviewer(
  ref: RefObject<HTMLVideoElement>,
  options: IPipviewerOptions
) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  let currentConfig = { close, visible: true } as any;
  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render(config: any) {
    ReactDOM.render(<Player {...config} videoRef={ref} />, div);
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy,
    };
    render(currentConfig);
  }
  render(currentConfig);
  return {
    destroy,
  };
}
