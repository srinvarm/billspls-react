import React from "react";
import Carousel from "react-material-ui-carousel";
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import {
  Paper,
  Button,
  Divider,
  Tabs,
  Tab,
  TabPanel,
  Box,
  Grid,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  upgradebutton: {
    variant: "contained",
    background: "green",
  },
});

function PlanDetails(props) {
  var items = [
    {
      planid: 7,
      plan_name: "Personal Premium",
      cost: 70.0,
      currency_type: "INR",
      user_type: "business",
      period: 30,
      channel: "GEN",
      send_notofication: false,
      services_available: [
        {
          service_name: "download",
          max_credits: 100000,
        },
        {
          service_name: "extraction",
          max_credits: 50,
        },
        {
          service_name: "approval_workflow",
          max_credits: 1,
        },
      ],
      tag: "₹ 70 / User / Month",
      line: [
        "upto 50 smart scans per user per month",
        "Add unlimited Users",
        "Approval Workflow and Integeration",
      ],
    },
    {
      planid: 8,
      plan_name: "Business Smart Scan Pack",
      cost: 20.0,
      currency_type: "INR",
      user_type: "business",
      period: 120,
      channel: "GEN",
      send_notofication: false,
      services_available: [
        {
          service_name: "extraction",
          max_credits: 50,
        },
      ],
      tag: "₹ 20 / User / Month",
      line: [
        "50 smart scans",
        "Expires in 6 months after purchase",
        "Distributed Equally to all the employees for business accounts",
      ],
    },
  ];

  
  return (
    <Box id="detailbox">
      {/* <Grid container>
        <Grid item xs={8}>
          <h5>Swipe To explore</h5>
        </Grid>
        <Grid item={4}>
          <HighlightOffIcon onClick={proceedHandler}/>
        </Grid>
      </Grid> */}

      <Carousel autoPlay={false} navButtonsAlwaysInvisible={true}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

function Item(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.item);
  const history = useHistory();
  const proceedHandler = () => history.push('/proceed');
  
  return (
    <Paper className={classes.root}>
      <h3>{props.item.plan_name}</h3>
      <Divider light />
    
      <Button classes={classes.upgradebutton} onClick={proceedHandler}>Proceed</Button>
    </Paper>
  );
}

export default PlanDetails;
