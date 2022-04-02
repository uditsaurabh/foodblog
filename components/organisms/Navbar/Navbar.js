import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { APP_NAME } from "../../../config";
import LinkGroup from "../../molecules/LinkGroup";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    appBar: {
      background: theme.palette.secondary.light,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolBarContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    link_group: {
      display: "flex",
      width: "50%",
      justifyContent: "space-between",
    },
  };
});

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBarContainer}>
          <Typography variant="h6">{APP_NAME}</Typography>
          <LinkGroup />
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
