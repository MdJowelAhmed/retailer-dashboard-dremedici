import React, { useState } from "react";
import { Button } from "antd";

const GradientButton = ({ onClick, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      type="primary"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        marginLeft: 10,
        background: isHovered
          ? "linear-gradient(to right, #6250EE, #6250EE)" // Reverse gradient on hover
          : "linear-gradient(to right, #6100EE, #6100EE)", // Default gradient
        color: "white",
        border: "none",
        transition: "background 0.3s ease-in-out",
      }}
      className="py-5 min-w-20"
    >
      {children}
    </Button>
  );
};

export default GradientButton;
