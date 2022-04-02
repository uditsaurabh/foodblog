import React from "react";
import { Button } from "@material-ui/core";

const CustomButton = ({ variant, color, children, ...props }) => {
  return (
    <Button variant={variant} color={color} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
