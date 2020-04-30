import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [value, setValue] = useState({
    windowWidth: window.innerWidth,
    windowHeigth: window.innerHeight,
  });

  useEffect(() => {
    const windowResize = () => {
      setValue({
        windowWidth: window.innerWidth,
        windowHeigth: window.innerHeight,
      });
    };

    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return value;
};

export default useWindowSize;
