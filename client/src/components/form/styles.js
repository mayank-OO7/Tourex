import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      margin: 10,
    },
  },
  paper: {
    padding: 20,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  login: {
    width: "100%",
    height: "100px",
    textAlign: "center",
    justifyContent: "flex-end",
    borderRadius: "10px",
  },
  loginText: {
    marginTop: "45px",
    paddingTop: "20px",
  },
}));
