import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import PlanDetails from "./PlanDetails";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import './plain.css'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "#C14310",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  

  planname: {
    fontSize: 18,
    alignContent: "left",
    color: "#FFFFFF",
  },

  detail: {
    fontSize: 13,
    alignContent: "left",
    color: "#FFFFFF",
    marginLeft: "-2em",
  },

  pos: {
    marginBottom: 12,
  },
  upgradeButton: {
    variant: "contained",
    color: "#FF682B",
    background: "#FFFFFF",
    width: 302,
    innerHeight: 50,
    fontSize:15
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
});

function PlanCard(props) {
  console.log(props.plandetail)
  const classes = useStyles();
  const [planDetail, setPlanDetail] = useState(props.plandetail);
  const [mounted, setMounted] = useState(false);
  const [upgradeDisable, setUpgradeDisable] = useState(false);
  const bull = <span className={classes.bullet}>•</span>;
  const toggle = () => {
    setMounted(!mounted);
    setUpgradeDisable(!upgradeDisable);
  };

  const upgradeHandler = () => {
    setMounted(!mounted)
    setUpgradeDisable(!upgradeDisable)
  }
  return (
    <div>
    {planDetail&&planDetail?
    <Card className={classes.root} variant="outlined">
      <CardContent>
      <div>
          <div className="plancard">{planDetail.title}</div>
          <div className="plancard_tag">{planDetail.tag}</div>
          </div>
        {
          <ul className={classes.detail} >
          {planDetail?
            <div>
            {planDetail&&planDetail.line.map((detail) => (
              <li key={detail}>
                <Typography className="plancard_details">{detail}</Typography>
              </li>
            ))}
            </div>
            :""}
          </ul>
        }
      </CardContent>
      <CardActions className={classes.actions}>
        <Grid container spacing={2} direction="row" justify="center">
          <Grid item xs={12} id="upgrade_button">
            <Button
              className={classes.upgradeButton}
              onClick={toggle}
              disabled={upgradeDisable}
            >
              {planDetail.button}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container className="swipe_card">
              <Grid item>
                {mounted && <h5>Swipe To explore</h5>}
              </Grid>
              <Grid item>
                {mounted && <HighlightOffIcon onClick={upgradeHandler}/>}
              </Grid>
            </Grid>
            
            {mounted && <PlanDetails />}
          </Grid>
        </Grid>
      </CardActions>
    </Card>:""}
    </div>
  );
}

export default PlanCard;
