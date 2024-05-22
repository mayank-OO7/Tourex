import React from "react";
import { Card, Typography, CardContent, Button, CardMedia, CardActions } from "@material-ui/core";
import moment from "moment";
import { Delete } from "@mui/icons-material";
import useStyles from "./styles";
import * as api from "../../../api/index";
import { postActions } from "../../../store/post-slice";
import { useDispatch, useSelector } from "react-redux";
import LikeButton from "./likeButton";
import { uiActions } from "../../../store/ui-slice";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);

  const like = async () => {
    const updatedPost = await api.likePost(post._id);
    if (updatedPost) {
      if (updatedPost.failed) dispatch(uiActions.showNotification({ type: "error", message: updatedPost.failed }));
      else dispatch(postActions.likePost(updatedPost));
    } else dispatch(uiActions.showNotification({ type: "error", message: "request failed" }));
  };

  const deletePost = async () => {
    dispatch(postActions.deletePost(post._id));
    await api.deletePost(post._id);
  };

  return (
    <Card className={classes.card} sx={{ maxWidth: 300 }}>
      <CardMedia component="img" image={post.imageUrl} alt="Image" height="200px" />
      <div className={classes.title}>
        <Typography variant="h6" color="primary">
          {post.title}
        </Typography>
        <Typography variant="body1" color="primary">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      <CardContent>
        <Typography variant="body1">{post.creator}</Typography>
        <Typography variant="body2" color="textSecondary">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <LikeButton likeCount={post.likes.length} disabled={user == null} onClick={like} />
        {user != null && (post.creatorId === user.data._id || post.creatorId === user.data.sub) && (
          <Button onClick={deletePost}>
            <Delete />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
