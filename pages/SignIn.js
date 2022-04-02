import React, { useState, useRef, useContext } from "react";
import CustomTextField from "../components/atoms/TextField/CustomTextField";
import ModalForm from "../components/organisms/ModalForms/ModalForm";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import CustomButton from "../components/atoms/CustomButton/CustomButton";
import CustomAlert from "../components/atoms/CustomAlert/CustomAlert";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { useRouter } from "next/router";
import withAuthHOC from "../HOC/withAuthHOC";
import CustomLoader from "../components/atoms/CustomLoader/CustomLoader";

const useStyles = makeStyles((theme) => {
  return {
    modal: {
      flexGrow: 1,
      width: "30vw",
      padding: "5%",
    },
    formComponent: {
      margin: "2% 0",
    },
  };
});

const SignIn = () => {
  const { ctx, setCtx } = useContext(AppContext);
  const fields = ["email", "password"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authForm = useRef(null);
  const classes = useStyles();
  const router = useRouter();

  const handleSubmit = (e) => {
    //making call to email and password
    e.preventDefault();
    setCtx((data) => ({ ...data, loading: true }));
    axios
      .post("/auth/signin", { email, password })
      .then((res) => {
        const {
          data: { user },
        } = res;
        setCtx((data) => ({
          ...data,
          email,
          password,
          loading: false,
          status: "",
          message: "",
          logged: true,
        }));
        authForm.current.reset();
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
        setCtx((data) => ({
          ...data,
          email,
          password,
          loading: false,
          status: "error",
          message: e.message,
        }));
      });
  };

  const handleTextField = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  };
  if (ctx.loading === true) {
    return <CustomLoader />;
  }
  return (
    <Layout>
      <ModalForm ref={authForm}>
        <Typography variant="h4" align="center">
          Sign In
        </Typography>
        {ctx.loading && (
          <CustomAlert severity="error">Authentication Failed</CustomAlert>
        )}
        <Box display="flex" flexDirection="column" className={classes.modal}>
          {fields.map((field) => (
            <CustomTextField
              key={field}
              className={classes.formComponent}
              label={field}
              name={field}
              variant="outlined"
              onChange={handleTextField}
              value={eval(field)}
              required
            />
          ))}
          <CustomButton
            className={classes.formComponent}
            variant="outlined"
            color="secondary"
            onClick={handleSubmit}
          >
            Sign In
          </CustomButton>
        </Box>
      </ModalForm>
    </Layout>
  );
};

export default withAuthHOC(SignIn);
