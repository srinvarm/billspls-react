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
  title: {
    fontSize: 26,
    alignContent: "left",
    color: "#FFFFFF",
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
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
});

function PlanCard(props) {
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
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {planDetail.title}
        </Typography>
        <Typography className={classes.planname} color="textSecondary">
          {planDetail.tag}
        </Typography>
        {
          <ul className={classes.detail}>
            {planDetail.line1.map((detail) => (
              <li key={Math.floor(Math.random() * 100)}>
                <Typography>{detail}</Typography>
              </li>
            ))}
          </ul>
        }
      </CardContent>
      <CardActions className={classes.actions}>
        <Grid container spacing={2} direction="row" justify="center">
          <Grid item xs={12}>
            <Button
              className={classes.upgradeButton}
              onClick={toggle}
              disabled={upgradeDisable}
            >
              UPGRADE TO PREMIUM
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
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
    </Card>
  );
}

export default PlanCard;
