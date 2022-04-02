import React, { useState, useRef, useContext, useEffect } from "react";
import CustomTextField from "../components/atoms/TextField/CustomTextField";
import ModalForm from "../components/organisms/ModalForms/ModalForm";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import CustomButton from "../components/atoms/CustomButton/CustomButton";
import CustomAlert from "../components/atoms/CustomAlert/CustomAlert";
import withAuthHOC from "../HOC/withAuthHOC";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import CustomLoader from "../components/atoms/CustomLoader/CustomLoader";

const useStyles = makeStyles((theme) => {
  console.log(theme);
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
const SignUp = () => {
  const fields = ["name", "email", "password"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { ctx, setCtx } = useContext(AppContext);
  const authForm = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    setCtx((data) => ({ ...data, message: "", status: null, loading: false }));
  }, []);

  const handleSubmit = (e) => {
    //making call to email and password
    e.preventDefault();
    setCtx((data) => ({ ...data, loading: true }));
    axios
      .post("/auth/signup", { email, password, name })
      .then(() => {
        setCtx((data) => ({
          ...data,
          loading: false,
          status: true,
          message: "",
        }));
      })
      .catch(({ message }) => ({
        ...data,
        loading: false,
        status: false,
        message,
      }));
  };
  const handleTextField = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
    else if (e.target.name === "name") setName(e.target.value);
  };
  if (ctx.loading === true) {
    return <CustomLoader />;
  }
  return (
    <Layout>
      <ModalForm ref={authForm}>
        <Typography variant="h4" align="center">
          Sign Up
        </Typography>
        {ctx.status && (
          <CustomAlert severity="success">
            Your SignUp is successfull —
            <strong>please navigate to signin to login</strong>
          </CustomAlert>
        )}
        {ctx.status === false ? (
          <CustomAlert severity="error">{ctx.message}</CustomAlert>
        ) : null}

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
              color="secondary"
            />
          ))}
          <CustomButton
            className={classes.formComponent}
            variant="outlined"
            color="secondary"
            onClick={handleSubmit}
          >
            Sign Up
          </CustomButton>
        </Box>
      </ModalForm>
    </Layout>
  );
};

export default withAuthHOC(SignUp);
