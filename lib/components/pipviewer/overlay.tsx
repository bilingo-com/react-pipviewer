import React, { RefObject, useEffect, useState, SyntheticEvent } from "react";
import useVideoState from "../../hooks/useVideoState";
import "./overlay.less";

interface IVideoAttrMap {
  [key: string]: any;
  [index: number]: any;
}

interface IOverlayProps {
  videoEl: RefObject<HTMLVideoElement>;
  onClose: () => void;
}

const Overlay = ({ onClose, videoEl }: IOverlayProps) => {
  const [buffered, setBuffered] = useState(0);
  const [played, setPlayed] = useState(0);
  const [reload, setReload] = useState(false);
  const videoState = useVideoState(videoEl) as IVideoAttrMap;

  useEffect(() => {
    const { buffered, duration, currentTime } = videoState;
    if (buffered && buffered.length) {
      setBuffered((buffered.end(buffered.length - 1) / duration) * 100);
    }
    setPlayed((currentTime / duration) * 100);
    setReload(currentTime === duration);
  }, [buffered, played, videoState, reload]);

  function togglePause(event: SyntheticEvent<HTMLDivElement>) {
    event.stopPropagation();
    const { paused } = videoState;
    if (videoEl.current) {
      paused ? videoEl.current.play() : videoEl.current.pause();
    }
  }

  function setCurrentTime(event: SyntheticEvent<any>) {
    event.stopPropagation();
    const { duration } = videoState;
    if (videoEl.current) {
      videoEl.current.currentTime =
        (event.currentTarget.value * duration) / 100;
    }
  }

  function reloadVideo() {
    if (videoEl.current) {
      videoEl.current.currentTime = 0;
      videoEl.current.play();
    }
  }

  return (
    <div className="pipviewer-overlay">
      <div className="icon-inner close-inner" onClick={onClose}>
        <i className="icon-close" />
      </div>
      {videoState.paused && !reload && (
        <div className="icon-inner" onClick={togglePause}>
          <i className="icon-play" />
        </div>
      )}
      {!videoState.paused && !reload && (
        <div className="icon-inner" onClick={togglePause}>
          <i className="icon-stop" />
        </div>
      )}
      {reload && (
        <div className="icon-inner" onClick={reloadVideo}>
          <i className="icon-reload" />
        </div>
      )}

      <div className="seek-wrapper">
        <div className="track">
          <div className="buffer" style={{ width: `${buffered}%` }} />
          <div className="fill" style={{ width: `${played}%` }} />
          <input
            min="0"
            step={1}
            max="100"
            type="range"
            onChange={setCurrentTime}
            className="input"
            value={played || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Overlay;
