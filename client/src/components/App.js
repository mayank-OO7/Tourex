import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import Navbar from "./navbar/navbar";
import Home from "./home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchPosts } from "../api/index";
import { postActions } from "../store/post-slice";
import { userActions } from "../store/user-slice";
import Auth from "./Auth/auth";
import { useDispatch } from "react-redux";
import Notification from "./notification/notification";
import { uiActions } from "../store/ui-slice";

const app = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetching posts initially
    async function loadPosts() {
      const posts = await fetchPosts();
      if (posts) dispatch(postActions.setPosts(posts));
      else dispatch(uiActions.showNotification({ type: "error", message: "failed to load posts" }));
    }
    loadPosts().catch((e) => console.log(e));

    // checking if user was logged in previously to relogin
    const previousLoginData = JSON.parse(localStorage.getItem("profile"));
    if (previousLoginData != null) dispatch(userActions.login(previousLoginData));
  }, []);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" exact element={<Auth />} />
        </Routes>
        <Notification />
      </Container>
    </BrowserRouter>
  );
};

export default app;
