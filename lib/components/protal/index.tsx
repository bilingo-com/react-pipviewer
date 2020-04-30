import React from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  container?: Element;
}

const Portal = (props: PortalProps) => {
  return ReactDOM.createPortal(
    React.Children.only(props.children),
    props.container || document.body
  );
};

export default Portal;
