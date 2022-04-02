import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    main: {
      margin: "30% 30%",
    },
  };
});

export default function CustomLoader() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <CircularProgress size={100} color="primary" disableShrink />;
      <Typography>Loading Text</Typography>
    </div>
  );
}
