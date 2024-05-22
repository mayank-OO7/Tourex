import React from "react";
import { Grow, Grid, Container } from "@mui/material";
import Post from "../posts/posts";
import Form from "../form/form";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  return (
    <Grow in>
      <Container className={classes.container}>
        <Grid container spacing={3} alignItems="stretch" justifyContent="space-between">
          <Grid item xs={12} md={7}>
            <Post />
          </Grid>
          <Grid className={classes.form} item xs={12} md={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
