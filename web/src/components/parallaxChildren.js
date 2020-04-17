import PropTypes from "prop-types";
import React from "react";

export default function ParallaxChildren(props) {
  const { children, onMount, className } = props;
  return (
    <div ref={node => onMount(node)} className={className || "react-parallax-content"} style={{ position: "relative" }}>
      {children}
    </div>
  );
}

ParallaxChildren.propTypes = { children: PropTypes.node, className: PropTypes.string, onMount: PropTypes.func };
