import React from "react";
import { TextField } from "@material-ui/core";

const CustomTextField = ({
  label,
  name,
  variant,
  handleChange,
  value,
  required,
  ...props
}) => {
  return (
    <TextField
      label={label}
      name={name}
      variant={variant}
      onChange={handleChange}
      value={value}
      required
      {...props}
    />
  );
};

export default CustomTextField;
