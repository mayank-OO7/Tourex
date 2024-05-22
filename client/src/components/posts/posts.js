import React from "react";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import Post from "./post/post";
import { CircularProgress, Grid } from "@mui/material";

const posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts.posts);

  return (
    <div>
      {posts.length === 0 ? (
        <CircularProgress />
      ) : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} xs={12} sm={6} item>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default posts;
