import { Grid } from "@material-ui/core";
import React,{useState} from "react";
import ConfirmPlan from '../components/ConfirmPlan'
import Switch from '@material-ui/core/Switch';
import Button from "@material-ui/core/Button";

function ConfirmPage() {
    const [users,setUsers]=useState(0)
    const [state, setState] = React.useState({checked: false,});
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
  return (
    <div>
      <Grid container spacing={2} direction="column" justify="center">
        <ConfirmPlan />
        <div className="confirm_page">
        <div className="confirm_plan_page">
            <p>You are choosing Business Premium Plan for</p>
            <div className="user_count">
                <h4>9+1</h4>
                <h6>users</h6>
            </div>
        </div>
        <div className="user_plans">
            <div className="sub_plans">
                <p>Business Premium Plan</p>
                <p>₹ 70 / User / Month</p>
            </div>
            <div className="sub_plans">
                <p>Number of Users</p>
                <div>
                    <button onClick={()=>setUsers(users-1)}>-</button>
                    <input value={users} disabled={true}></input>
                    <button onClick={()=>setUsers(users+1)}>+</button>
                </div>
            </div>
            <div className="sub_plans">
                <p>Total</p>
                <p>₹ 70 /Total</p>
            </div>
            <div className="sub_plans">
                <p>GST</p>
                <p>18%</p>
            </div>
        </div>
        <div className="sub_plans footer">
                <p>Amount to be paid</p>
                <p>₹ 826 / Month</p>
        </div>
        <div className="checked">
            <div className="toggle">
            <p>Do you want to be GST enabled?</p>
            <Switch
                checked={state.checked}
                onChange={handleChange}
                name="checked"
                inputProps={{ 'aria-label': '#FF682B checkbox' }}
            />
            </div>
            {state.checked?
            <div className="gst_input">
            <span>GST Number</span>
            <input />
            </div>
            :""}
        </div>
        </div>
      </Grid>
      <div className="footer_button">
            <Button className="upgradebutton">CONFIRM</Button>
      </div>
    </div>
  );
}

export default ConfirmPage;
