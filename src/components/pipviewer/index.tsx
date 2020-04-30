import React, { useEffect, useState, RefObject } from "react";
import ReactDOM from "react-dom";
import Player from "./player";
import useInViewport from "../../hooks/useInViewport";
import { isBoolean } from "../../utils/tools";
import useVideoState from "../../hooks/useVideoState";

interface IVideoAttrMap {
  [key: string]: any;
  [index: number]: any;
}

interface PlayerProps {
  videoRef: RefObject<HTMLVideoElement>;
  visible: boolean;
  destroy: () => void;
  styles: React.CSSProperties;
  [key: string]: any;
}

const PlayerConnect = (props: PlayerProps) => {
  const [visible, setVisible] = useState<boolean>(props.visible);
  const [isToggleClose, setIsToggleClose] = useState<boolean>(false);
  const { isInviewport } = useInViewport(props.videoRef, props.viewportPercent);
  const [preVideoPaused, setVideoPaused] = useState<boolean>();
  const videoState = useVideoState(props.videoRef) as IVideoAttrMap;
  const [pipVideoState, setPipVideoState] = useState<IVideoAttrMap>();

  useEffect(() => {
    if (props.videoRef.current) {
      setVideoPaused(props.videoRef.current.paused);
    }
  }, [props.videoRef, videoState]);

  useEffect(() => {
    if (isInviewport && isToggleClose) {
      setIsToggleClose(false);
    }
    if (!isToggleClose) {
      setVisible(!isInviewport);
    }
    // if (props.videoRef.current && isBoolean(preVideoPaused) && pipVideoState) {
    //   const { paused, currentTime } = pipVideoState;
    //   console.log(paused, currentTime, preVideoPaused);
    //   const $el = props.videoRef.current;
    //   if (visible) {
    //     $el.pause();
    //   } else {
    //     $el.currentTime = currentTime;
    //     $el.play();
    //   }
    // }
  }, [isInviewport, isToggleClose]);

  function onClose() {
    setIsToggleClose(true);
    setVisible(false);
  }

  return visible ? (
    <Player
      {...props}
      onClose={onClose}
      visible={visible}
      getPipVideoState={setPipVideoState}
    />
  ) : null;
};

interface IPipviewerOptions {
  useParentVideoState: boolean;
  viewportPercent: number;
  autoplay: boolean;
}

interface IPipviewerProps {
  ref: RefObject<HTMLVideoElement>;
  options?: IPipviewerOptions;
}

export default function pipviewer({
  ref,
  options = { useParentVideoState: true, viewportPercent: 50, autoplay: true },
}: IPipviewerProps) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  let currentConfig = { destroy, visible: false } as any;
  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function render(config: any) {
    const playerProps = { ...options, ...config };
    ReactDOM.render(<PlayerConnect {...playerProps} videoRef={ref} />, div);
  }

  render(currentConfig);
  return {
    destroy,
  };
}
