import { RefObject, useEffect, useState } from "react";

// 暂时用css,遇到个问题就是使用hoosk动态组件如何重新绑定事件
const useHover = (ref: RefObject<Element>, enabled: boolean = true) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const onMouseOver = () => {
      console.log("over");
      setValue(true);
    };
    const onMouseOut = () => {
      setValue(false);
      console.log("out");
    };
    if (enabled && ref && ref.current) {
      ref.current.addEventListener("mouseover", onMouseOver);
      ref.current.addEventListener("mouseout", onMouseOut);
    }
    const { current } = ref;

    return () => {
      if (enabled && current) {
        current.removeEventListener("mouseover", onMouseOver);
        current.removeEventListener("mouseout", onMouseOut);
      }
    };
  }, [enabled, ref]);

  return value;
};

export default useHover;
