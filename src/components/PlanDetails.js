import React,{useEffect,useState} from "react";
import Carousel from "react-material-ui-carousel";
import { useHistory } from "react-router-dom";
import { Paper, Button, Divider, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loader from '../components/Loader'
import {Available_plans,Admin_active_users} from '../Actions'
import { useDispatch,useSelector } from 'react-redux';
import { ToggleButton } from "@material-ui/lab";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  upgradebutton: {
    variant: "contained",
    background: "green",
    background: "#45A815",
    width: "100%",
    color: "white",
    marginBottom:"10px"

  },
});
function PlanDetails(props) {
const dispatch = useDispatch()
  const {plans_loader=false,plans_available={}} = useSelector(({billspls})=>billspls)
  // useEffect(() => {
  //     dispatch(Available_plans())
  // }, [])
  const style={
    marginTop:"10%",
    color:"white",
  }
  return (
    <Box id="detailbox">
    <div className="signup_data1">
    {plans_available&&Object.keys(plans_available).length>0?
      <Carousel autoPlay={false} navButtonsAlwaysInvisible={true}>
        {plans_available.map((item, i) => (
          <div className="swiping">
            <Item key={i} item={item} />
          </div>
        ))}
      </Carousel>
      :<Loader msg="Please wait..." style={style} />}
      </div>
    </Box>
  );
}

function Item(props) {
const dispatch = useDispatch()
  const classes = useStyles();
  const history = useHistory();
  const [alignment, setAlignment] = React.useState("Monthly");
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const proceedHandler = async () => {
  dispatch(Admin_active_users((cb)=> {
    if (cb) {
      if (props.item&&props.item.annual&&alignment==="Annually"){
        history.push({pathname:"/proceed",state: { message: props.item.annual }})
      }else if (props.item&&props.item.plan_name==="enterprise") {
        window.open("https://in-d.ai/get-started/", "_blank")
      }
      else {
        history.push({pathname:"/proceed",state: { message: props.item }})
      }
    }
  }));
  };
  console.log(props.item)
  console.log(props.item.annual)
  return (
    <Paper className={classes.root}>
    {props.item&&props.item?
    <div>
      <h3>{props.item.name}</h3>
      <hr className="proceed_hr"/>
      <div className="switch_button">
      {props.item.annual_flag ? (
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            value="Monthly"
            aria-label="centered"
            className="switch_first_button"
          >
            <div>Monthly</div>
          </ToggleButton>
          <ToggleButton
            value="Annually"
            aria-label="left aligned"
            className="switch_second_button"
          >
            <div>Annually</div>
          </ToggleButton>
        </ToggleButtonGroup>
      ) : (
        ""
      )}
    </div>
      <div className="corasal">
        <div className="item_tag">
        {alignment==="Annually"&&props.item&&props.item.annual?
        <div>₹{props.item.annual.cost}</div>
        :<div>{props.item.tag}</div>}
        </div>
        <ul className={classes.detail}>
        {props.item.line.map((detail) => (
          <li key={detail}>
            <div>{detail}</div>
          </li>
        ))}
        </ul>
        <Grid item xs={12}></Grid>
      </div>
      {props.item.plan_name==="business_premium"?
      <Button className="upgradebutton" onClick={proceedHandler}>
        Proceed
      </Button>
      :props.item.plan_name==="business_smart_scan_pack"?
      <Button className="upgradebutton" onClick={proceedHandler}>
        BUY NOW
      </Button>:props.item.plan_name==="enterprise"?
      <Button className="upgradebutton" onClick={proceedHandler}>
      SCHEDULE A CALL
    </Button>:""
    }
      </div>
      :""}
      
    </Paper>
  );
}

export default PlanDetails;
