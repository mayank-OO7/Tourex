import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { createPost } from "../../api/index";
import { postActions } from "../../store/post-slice";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });
  const [disableSubmitButton, setdisableSubmitButton] = useState(false);

  const handleSubmit = async (e) => {
    setdisableSubmitButton(true);
    e.preventDefault();
    try {
      const newPost = await createPost({ ...postData, creator: user.data.name });
      if (newPost != null) {
        dispatch(postActions.createPost(newPost));
        dispatch(uiActions.showNotification({ type: "success", message: "Post Created" }));
      }
    } catch (e) {
      console.log(e);
    }
    clear();
    setdisableSubmitButton(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((previousData) => {
      return { ...previousData, [name]: value };
    });
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      imageUrl: "",
    });
  };

  if (user == null) {
    return (
      <Paper className={classes.login}>
        <Typography variant="h6" className={classes.loginText}>
          Please Signin to create and like posts
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Where you visited?</Typography>

        <TextField fullWidth variant="outlined" name="title" label="Title" onChange={handleChange} value={postData.title} />
        <TextField fullWidth variant="outlined" name="message" label="Message" onChange={handleChange} value={postData.message} />
        <TextField fullWidth variant="outlined" name="imageUrl" label="Image Url" onChange={handleChange} value={postData.imageUrl} />

        <Button className={classes.buttonSubmit} variant="contained" fullWidth color="primary" size="large" type="submit" onSubmit={handleSubmit} disabled={disableSubmitButton}>
          Submit
        </Button>
        <Button fullWidth variant="contained" color="secondary" size="small">
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default form;
