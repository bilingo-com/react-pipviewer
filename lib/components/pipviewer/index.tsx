import React, { useEffect, useState, RefObject } from "react";
import ReactDOM from "react-dom";
import Player from "./player";
import useInViewport from "../../hooks/useInViewport";
import useVideoState from "../../hooks/useVideoState";

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
  const parentVideoState = useVideoState(props.videoRef);

  useEffect(() => {
    if (isInviewport && isToggleClose) {
      setIsToggleClose(false);
    }
    if (!isToggleClose) {
      setVisible(!isInviewport);
    }
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
      parentVideoState={parentVideoState}
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
