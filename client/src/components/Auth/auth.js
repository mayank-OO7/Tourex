import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Button, Avatar, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useStyles from "./styles";
import jwtDecode from "jwt-decode";
import Input from "./input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp, signIn } from "../../api/index";
import { userActions } from "../../store/user-slice";
import { uiActions } from "../../store/ui-slice";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [authData, setAuthData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const googleLogin = (res) => {
    const userCred = res.credential;
    const user = jwtDecode(userCred);
    dispatch(userActions.login({ data: user, token: userCred }));
    navigate("/");
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "187368834469-7eflj2pb9b462kmb790ovrgc6l1b7d3j.apps.googleusercontent.com",
      callback: googleLogin,
    });

    google.accounts.id.renderButton(document.getElementById("googleLogin"), { theme: "outline", size: "large", fullWidth: true });
  }, []);

  const switchMode = () => {
    setIsSignup((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const data = await signUp(authData);
      if (data) {
        if (data.failed) dispatch(uiActions.showNotification({ type: "error", message: data.failed }));
        else {
          dispatch(userActions.login(data));
          navigate("/");
        }
      } else dispatch(uiActions.showNotification({ type: "error", message: "some error occurred" }));
    } else {
      const data = await signIn(authData);
      if (data) {
        if (data.failed) dispatch(uiActions.showNotification({ type: "error", message: data.failed }));
        else {
          dispatch(userActions.login(data));
          navigate("/");
        }
      } else dispatch(uiActions.showNotification({ type: "error", message: "some error occurred" }));
    }
  };

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input type="" half autoFocus name="firstName" value={authData.firstName} label="First Name" onChange={handleChange} />
                <Input type="" half name="lastName" value={authData.lastName} label="Last Name" onChange={handleChange} />
              </>
            )}
            <Input type="email" autoFocus={!isSignup} name="email" value={authData.email} label="E-mail" onChange={handleChange} />
            <Input type="password" name="password" label="Password" value={authData.password} onChange={handleChange} />
            {isSignup && <Input type="password" name="confirmPassword" value={authData.confirmPassword} label="confirmPassword" onChange={handleChange} />}
          </Grid>

          <Button className={classes.submit} fullWidth type="submit" variant="contained" color="primary">
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <div id="googleLogin" className={classes.googleLogin}></div>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
