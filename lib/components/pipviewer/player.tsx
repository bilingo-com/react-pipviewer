import React, { useEffect, useRef, useState, RefObject, useMemo } from "react";
import Draggable from "../draggable";
import Portal from "../protal";
import Overlay from "./overlay";

import "./player.less";

const POSITION = {
  x: window.innerWidth - (50 + 300),
  y: window.innerHeight - (60 + 200),
};

interface IVideoAttrMap {
  [key: string]: any;
  [index: number]: any;
}

interface PlayerProps {
  videoRef: RefObject<HTMLVideoElement>;
  visible: boolean;
  destroy: () => void;
  onClose: () => void;
  styles: React.CSSProperties;
  [key: string]: any;
}

const Player = (props: PlayerProps) => {
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const pipViewerRef = useRef<HTMLDivElement>(null);
  const [videoInfo, setVideoInfo] = useState<IVideoAttrMap>({});

  useEffect(() => {
    if (props.videoRef.current && pipVideoRef.current) {
      const $parentEl = props.videoRef.current;
      const $pipEl = pipVideoRef.current;
      const { paused, src, poster, currentTime } = $parentEl;
      $pipEl.currentTime = currentTime;
      setVideoInfo({ poster, src });
      if (!paused) {
        $pipEl.autoplay = true;
      }
    }
  }, [props.videoRef]);

  const styles = useMemo(
    () =>
      ({
        ...props.styles,
      } as React.CSSProperties),
    [props.styles]
  );

  return (
    <Portal>
      <Draggable position={POSITION}>
        <div className="pipviewer-container" ref={pipViewerRef} style={styles}>
          <video
            ref={pipVideoRef}
            className="pip-video"
            src={videoInfo.src}
            poster={videoInfo.poster}
          ></video>
          <div className="layer-wrapper">
            <Overlay videoEl={pipVideoRef} onClose={props.onClose} />
          </div>
        </div>
      </Draggable>
    </Portal>
  );
};

export default Player;
