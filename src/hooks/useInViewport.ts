import { useEffect, RefObject } from "react";
import useRafState from "./useRafState";

export interface State {
  isInviewport: boolean;
}

const useInViewport = (
  ref: RefObject<HTMLVideoElement>,
  percent: number = 30
): State => {
  const [state, setState] = useRafState<State>({ isInviewport: true });

  useEffect(() => {
    const handler = () => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();

        if (height * (percent / 100) < Math.abs(top)) {
          setState({ isInviewport: false });
        }
        if (height * (percent / 100) > Math.abs(top)) {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) {
        window.removeEventListener("scroll", handler);
      }
    };
  }, [percent, ref, setState]);

  return state;
};

export default useInViewport;
