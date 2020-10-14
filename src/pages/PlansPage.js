import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { AppBar, Card,Toolbar } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import Example from '../components/PlanDetails';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlanCard from '../components/PlanCard'
import PendingCount from '../components/PendingCount';

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

const planData = {
    "title": "You are in Personal Free Plan",
    "tag": "Free forever",
    "line1": [
        "upto 10 smart scans per month",
        "Add unlimited Users",
        "Unlimited Expenses and Reports",
        "All available Currencies",
        "Custom Categories"
    ],
    "expiry": "2022-09-06T05:27:14.215891Z",
    "data": [
        {
            "credits_left": 95,
            "total_credits": 100,
            "text": "Smart Scan Count"
        },
        {
            "credits_left": 20,
            "total_credits": 20,
            "text": "Report Export Count"
        }
    ]
}

export default function PlansPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={2} direction="column" justify="center">
          <Grid item xs={12}>
            <AppBar position="static" className={classes.appbar}>
              <Toolbar>
                <ArrowBackIcon/>
                <Typography variant="h6" style={{ marginLeft: 16 }}>
                  Plans and Billing
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12}>
            <PlanCard plandetail = {planData}/>
          </Grid>
          <Grid item xs={12}>
            <PendingCount pendingCount={planData.data[0]}/>
          </Grid>
          <Grid item xs={12}>
            <PendingCount pendingCount={planData.data[1]}/>
          </Grid>
        </Grid>
    </div>
  );
}
