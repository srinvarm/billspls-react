import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PlanCard from "../components/PlanCard";
import PendingCount from "../components/PendingCount";
import "../components/plain.css";
import Loader from "../components/Loader";
import {Token,Balance,Logout,Admin_active_users,Available_plans} from '../Actions'
import { useDispatch,useSelector } from 'react-redux';
import Modal from "../components/Modal";
import {  Button } from "@material-ui/core";

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

export default function PlansPage() {
  const {balance_loader=false,balance={},plans_available={},plans_loader=false} = useSelector(({billspls})=>billspls)
  const [showModal,setShowModal]=useState(false)
  const [msg,setMessage]=useState("")
  const [response,setResponse]=useState("")
  const dispatch=useDispatch()
  const classes = useStyles();
  useEffect(() => {
    dispatch(Token())
    dispatch(Balance())
    dispatch(Available_plans())
    dispatch(Admin_active_users((cb)=> {
      if (cb) {
        console.log(cb)
      }
    }))
  }, []);
  const Delete=()=> {
    dispatch(Logout())
  }
  const ModalHide = () => {
    setShowModal(false);
  };
  const ViewInvoices=()=> {
    // setResponse("download Data")
    setMessage("Download")
    // setShowModal(true)
  }
  console.log(response,msg)
  if (msg && showModal) {
    return (
      <Modal
        msg={msg}
        ModalShow={showModal}
        hide={ModalHide}
        response={response}
        button={"Close"}
      />
    );
  }
  if (balance_loader&&plans_loader) {
    return <Loader msg="Please wait Your plans page will display soon...."/>
  }else {
  return (
    <div className={classes.root}>
   {/*
    <button onClick={Delete}>Logout</button>*/}
      { balance&&Object.keys(balance).length>0 ? (
        <Grid container spacing={2} direction="column" justify="center">
          <div className="main_plan_page">
            <Grid item xs={12}>
              <PlanCard plandetail={balance} />
            </Grid>
            <Grid item xs={12} className="counting_div">
              <PendingCount pendingCount={balance}/>
            </Grid>
          </div>
      <Button className="view_invoice" onClick={ViewInvoices}>View Invoices</Button>
        </Grid>
      ) : (
          <div className="loader-wrapper">Something Went wrong</div>
      )}
    </div>
  );
      }
}
