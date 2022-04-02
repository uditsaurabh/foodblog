import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import CustomLink from "../atoms/CustomLink/CustomLink";
import { useCookies } from "react-cookie";
import { AppContext } from "../../contexts/AppContext";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => {
  return {
    link_group: {
      display: "flex",
      width: "50%",
      justifyContent: "space-between",
    },
  };
});

const loggingLinks = ["SignIn", "SignUp"];
let user;
const LinkGroup = () => {
  let db;
  if (process.browser) {
    user = JSON.parse(localStorage.getItem("user"));
    console.log("****user****", user);
    if (user) {
      if (user?.role === 0) db = "user";
      else if (user?.role === 1) db = "admin";
    }
  }

  const navLinks = [
    {
      id: 1,
      href: "/Contact",
      linkText: "Contact",
    },
    {
      id: 2,
      href: "/blogs",
      linkText: "Blogs",
    },
    {
      id: 3,
      href: `/dashboard/${db}`,
      linkText: `${user ? `${user.name}'s Dashboard` : ""}`,
    },
    {
      id: 4,
      href: "/SignUp",
      linkText: "SignUp",
    },
    {
      id: 5,
      href: "/SignIn",
      linkText: "SignIn",
    },
  ];

  const classes = useStyles();
  const { ctx, setCtx } = useContext(AppContext);
  const [{ token }, _, removeToken] = useCookies("token");
  const router = useRouter();

  const getLoginLinks = () => {
    let arr = navLinks.map(({ id, href, linkText }, index, arr) => {
      if (token) {
        if (!loggingLinks.includes(linkText)) {
          return (
            <CustomLink key={id} href={href} linkText={linkText}></CustomLink>
          );
        }
      } else if (linkText !== "Dashboard") {
        return (
          <CustomLink key={id} href={href} linkText={linkText}></CustomLink>
        );
      }
    });
    if (token)
      arr.push(
        <Typography
          onClick={() => {
            localStorage.clear();
            removeToken(["token"]);
            setCtx((data) => ({ ...data, logged: false }));
            router.push("/SignIn");
          }}
          variant="h5"
          key={"xyz"}
        >
          SignOut
        </Typography>
      );
    return arr;
  };
  return <div className={classes.link_group}>{getLoginLinks()}</div>;
};

export default LinkGroup;
