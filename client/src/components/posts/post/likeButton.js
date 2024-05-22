import React from "react";
import { Button } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

const LikeButton = ({ disabled, onClick, likeCount }) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      <ThumbUp />
      &nbsp;{` ${likeCount}`}
    </Button>
  );
};

export default LikeButton;
