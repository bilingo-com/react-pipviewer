import React, { useState, useCallback, useMemo, useEffect } from "react";

const POSITION = { x: 0, y: 0 };
const PIPVERWER_ZINDEX = 9999;

interface IPosition {
  x: number;
  y: number;
}

interface IProps {
  children: React.ReactNode;
  position: IPosition;
}

const Draggable = ({ children, position }: IProps) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
    position,
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      };

      const position = {
        x: state.position.x + translation.x,
        y: state.position.y + translation.y,
      };
      setState((state) => ({
        ...state,
        translation,
        position,
      }));
    },
    [state.origin]
  );

  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () =>
      ({
        cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
        position: "fixed",
        top: `${state.position.y}px`,
        left: `${state.position.x}px`,
        transition: state.isDragging ? "none" : "top left 500ms",
        zIndex: PIPVERWER_ZINDEX,
      } as React.CSSProperties),
    [state.isDragging, state.position.x, state.position.y]
  );

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Draggable;
