import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, AppBar, Toolbar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: "#FF682B",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

function ConfirmPlan() {
  const classes = useStyles();

  const history = useHistory();

  const backhandler = () => {
    history.push("/");
  };
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={2} direction="column" justify="center">
          <Grid item xs={12}>
            <AppBar position="static" className="appnav">
              <Toolbar>
                <ArrowBackIcon onClick={backhandler} />
                <Typography style={{ marginLeft: 16 }}>
                  Confirm Plan
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ConfirmPlan;
