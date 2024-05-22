import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const notify = () => {
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(uiActions.closeNotification());
  };

  return (
    <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={handleClose} variant="filled" severity={notification.type}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default notify;
