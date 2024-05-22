import React from "react";
import { Grid, TextField } from "@material-ui/core";

const Input = ({ half, name, value, label, type, onChange, autoFocus }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField variant="outlined" required fullWidth name={name} label={label} type={type} onChange={onChange} value={value} autoFocus={autoFocus} />
    </Grid>
  );
};

export default Input;
