import { useEffect, RefObject } from "react";
import useRafState from "./useRafState";

export interface State {
  isInviewport: boolean;
}

const useInViewport = (ref: RefObject<HTMLElement>): State => {
  const [state, setState] = useRafState<State>({ isInviewport: true });

  useEffect(() => {
    const handler = () => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        if (height / 3 < Math.abs(top)) {
          setState({ isInviewport: false });
        }
        if (height / 3 > Math.abs(top)) {
          setState({ isInviewport: true });
        }
      }
    };

    if (ref.current) {
      window.addEventListener("scroll", handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref.current) {
        window.removeEventListener("scroll", handler);
      }
    };
  }, [ref]);

  return state;
};

export default useInViewport;
