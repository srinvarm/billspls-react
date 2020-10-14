import React from "react";
import Carousel from "react-material-ui-carousel";
import { useHistory } from "react-router-dom";
import { Paper, Button, Divider, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "./Switch";
import PlanCard from "../components/PlanCard";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  upgradebutton: {
    variant: "contained",
    background: "green",
    background: "#45A815",
    width: "100%",
    color: "white"

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
      line: [{data:"upto 50 smart scans per user per month",id:1},
        {data:"Add unlimited Users",id:2},
       {data:"Approval Workflow and Integeration",id:3}
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
      line: [{data:
        "50 smart scans",id:1},
        {data:"Expires in 6 months after purchase",id:2},
        {data:"Distributed Equally to all the employees for business accounts",id:3}
      ],
    },
  ];

  return (
    <Box id="detailbox">
      <Carousel autoPlay={false} navButtonsAlwaysInvisible={true}>
        {items.map((item, i) => (
          <div className="swiping">
            <Item key={i} item={item} />
          </div>
        ))}
      </Carousel>
    </Box>
  );
}

function Item(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.item);
  const history = useHistory();
  const proceedHandler = () => history.push("/proceed");

  return (
    <Paper className={classes.root}>
      <h3>{props.item.plan_name}</h3>
      <Divider light />
      <Switch />
      <div>
        <h6 className="item_tag">
         {props.item.tag}
        </h6>
        <ul className={classes.detail}>
        {props.item.line.map((detail) => (
          <li key={detail.id}>
            <div>{detail.data}</div>
          </li>
        ))}
        </ul>
        <Grid item xs={12}></Grid>
      </div>
      <Button className="upgradebutton" onClick={proceedHandler}>
        Proceed
      </Button>
    </Paper>
  );
}

export default PlanDetails;
