import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Pathimage from '../Images/path.png';
import { useDispatch,useSelector } from 'react-redux';
// import {Admin_active_users,Available_plans} from '../Actions'

function PendingCount({ pendingCount }) {
const dispatch = useDispatch()
  const {plans_available={}} = useSelector(({billspls})=>billspls)
  const {activeusers={}} = useSelector(({indone})=>indone)

  const data = Date.parse("2021-04-17T04:16:45.332246Z");
  var s = new Date(data).toLocaleDateString("en-US");
  console.log(s);
  const today = new Date().toLocaleString();
  console.log(today);

console.log(plans_available)
let user_data=""
if (plans_available&&Object.keys(plans_available).length>0){
  user_data=plans_available&&plans_available.map(function(item, i){
    return item.user_type
  })
}
  console.log(user_data)
  console.log(activeusers.length)
  const bussiness_user=user_data.indexOf("business") > -1
  console.log(bussiness_user)
  return (
    <div className="pendingcount">
      {bussiness_user&&bussiness_user?
        <div className="pending_count_box">
          <div>
            {activeusers&&activeusers?
            <div className="users_number">{activeusers.length}</div>
            :""}
            <div className="users_text">Number of Employees</div>
          </div>
          <img src={Pathimage} className="path_image"/>
        </div>
        :""}
      {pendingCount && pendingCount !== undefined
        ? pendingCount.data.map((item) => (
            <div key={item.text} className="pending_count_box">
              <div>
                <div className="pending">Your Pending</div>
                <div className="pending_text">{item.text}</div>
              </div>
              <div>
                <CircularProgressbar
                  value={(item.credits_left / item.total_credits) * 100}
                  text={`${item.credits_left}/${item.total_credits}`}
                  styles={buildStyles({
                    rotation: 0.5,
                    strokeLinecap: "butt",
                    pathTransitionDuration: 0.5,
                    pathColor: `#FF682B, ${
                      item.credits_left / item.total_credits
                    })`,
                    textColor: "#161616",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#FF682B",
                    stroke: "#FF682B",
                  })}
                />
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export default PendingCount;
