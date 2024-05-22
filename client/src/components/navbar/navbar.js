import React, { useEffect } from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import memories from "../images/memories.png";
import { userActions } from "../../store/user-slice";
import useStyles from "./styles";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      const token = decode(user.token);

      if (token.exp * 1000 < new Date().getTime()) logout();
    }
  }, [user]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Tourex
          <img className={classes.image} src={memories} alt="memories" height="60" />
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.data.name} src={user.data.picture}>
              {user.data.picture == null && user.data.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.data.name}
            </Typography>
            <Button variant="contained" onClick={logout} color="secondary" className={classes.logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/login" variant="contained" color="primary">
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
