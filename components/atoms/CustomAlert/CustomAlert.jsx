import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
const CustomAlert = ({ severity, children }) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{severity}</AlertTitle>
      {children}
    </Alert>
  );
};

export default CustomAlert;
