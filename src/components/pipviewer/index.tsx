import React, { useEffect, useRef, useState, RefObject } from "react";
import ReactDOM from "react-dom";
import useInViewport from "../../hooks/useInViewport";
import Portal from "../protal";

import "./index.scss";

const PIPVERWER_ZINDEX = 9999;

interface PlayerProps {
  videoPlayer?: React.ReactNode;
  videoRef: RefObject<HTMLElement>;
  visible?: boolean;
  afterClose?: () => void;
}

const Player = (props: PlayerProps) => {
  const [visible, setVisible] = useState(props.visible);
  const [videoInfo, setVideoInfo] = useState<any>({});
  const { isInviewport } = useInViewport(props.videoRef);

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
  }, []);
  return visible ? (
    <Portal>
      <div className="pipviewer-wrapper">
        <video
          width="300"
          height="200"
          src={videoInfo.src}
          poster={videoInfo.poster}
          controls
        ></video>
      </div>
    </Portal>
  ) : null;
};

interface IPipviewerOptions {}

export default function pipviewer(
  ref: RefObject<HTMLElement>,
  options: IPipviewerOptions
) {
  // console.log(ref, options);
  const div = document.createElement("div");
  document.body.appendChild(div);

  let currentConfig = { close, visible: false } as any;
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
