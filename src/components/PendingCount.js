import React from 'react'
import {Card,CardContent, Grid, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const useStyles = makeStyles({
  root: {   
    minWidth: 275,
    background: "#FFFFFF",
  },
  cardcontent: {
    height: 168,
  },
  circularbar:{
    path: '16px',
  }
 
});


function PendingCount(props) {
    const classes = useStyles()
    const credits_left = props.pendingCount.credits_left
    const total_credits = props.pendingCount.total_credits
    const progress_value = credits_left/total_credits
    return (
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.cardcontent} color="textSecondary">
            <Grid container spacing={2} direction="row" justify="center">
              <Grid item xs={6}>
                <Typography>Your Pending</Typography>
                <Typography>{props.pendingCount.text}</Typography>
              </Grid>
              <Grid item xs={6}>
              <CircularProgressbar value={progress_value*100} text={`${credits_left}/${total_credits}`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,
             
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
             
                // Text size
                textSize: '16px',
             
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,
             
                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
             
                // Colors
                pathColor: `rgba(255, 104, 43, ${progress_value})`,
                textColor: '#161616',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
}

export default PendingCount
