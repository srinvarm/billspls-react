import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import {IND_ONE_BASE_URL,PATH} from '../Constants'
import { useDispatch,useSelector } from 'react-redux';
import {Payment_status} from '../Actions'

let token;
function ConfirmPage(props) {
  const dispatch = useDispatch()
  const {activeusers={},payment_status=""} = useSelector(({indone})=>indone)
  const {token} = useSelector(({user})=>user)
  console.log(token)
  const [data, setMaindata] = useState({
    ischecked: true,
    values: [],
    sub_total: 0,
    total: "",
    users: 0,
    gst_checked: false,
    gst_number: "",
    prev_data: props.location.state.message,
    showModal: false,
    msg: "",
    response: "",
  });
  const [loader, setLoader] = useState(false);
  console.log(data.prev_data)
  var plan_details = data.prev_data && data.prev_data ? data.prev_data : {};
  const ModalHide = () => {
    setMaindata({ ...data, showModal: false });
    props.history.push({ pathname: "/" });
  };
  const handleChange = (event) => {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? !data.gst_checked
        : target.name === "gst_number"
        ? target.value
        : "";
    setMaindata({ ...data, [target.name]: value });
  };
 
  const onChange = (opt) => {
    console.log(opt)
    setMaindata({
      ...data,
      values: opt,
    });
  };
  const Maindata=()=> {
    if (activeusers) {
      setMaindata({...data,values:activeusers})
    }
  }
  console.log(data.values)
  useEffect(() => {
    const price = plan_details.cost;
    const data1 = price + price * 0.18;
    const length_user = data.values && data.values ? data.values.length : {};
    setMaindata({
      ...data,
      total: Math.floor(length_user * data1),
      sub_total: length_user * price,
    });
  }, [data.values]);
  useEffect(()=> {
    Maindata()
  },[])
  const Razorpay = async (main) => {
  

    const res = await axios("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razor SDK failed to load.");
    }
    const options = {
      key: "rzp_live_6wgy2mYvetETz9",
      currency: main.currency,
      amount: main.price,
      order_id: main.order_id,
      name: main.name,
      description: "Test Transaction",
      image: "http://localhost:1337/logo.svg",
      handler: async function (response) {
        console.log(response);
        // dispatch(Payment_status((cb)=> {
        //   if (cb) {
        //       setMaindata({
        //         ...data,
        //         msg: "Payment Successfull",
        //         response: "Your Plan is being assigned",
        //         showModal: true,
        //         loader: true,
        //       });
        //       Transaction(payment_status)
        //   }
        // }));
        try {
          const submitdata = await axios(
            `${IND_ONE_BASE_URL}${PATH.payment_status}`,
            {
              method: "POST",
              data: response,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((res) => {
            console.log(res)
            if (res.data.status === "Payment Successful") {
              setMaindata({
                ...data,
                msg: "Payment Successfull",
                response: "Your Plan is being assigned",
                showModal: true,
                loader: true,
              });
              Transaction(res.data.transaction_status)
            }
          });
        } catch (error) {
          console.log(error);
          setLoader(false);
        }
      },
      prefill: {
        name: main.name,
        email: main.email,
        contact: main.phone,
      },
    };
    console.log(options)

    let rzp = new window.Razorpay(options);
    rzp.open();
  };
  const Transaction = async (status) => {
    console.log(status)
    const email_data = [];
    const data1 = {
      plan: plan_details.planid,
      transaction_status: status,
      emailids: email_data,
    };
    const emails = data.values.map((item) => {
      email_data.push(item.label);
    });
    try {
      const payment = await axios(`${IND_ONE_BASE_URL}${PATH.transactions}`, {
        method: "POST",
        data: data1,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (
          res.data["Transaction added successfully"].transaction_status === true
        ) {
          setMaindata({
            ...data,
            msg: "Your Payment Successfull",
            response: "Your Plan is assigned",
            showModal: true,
          });
        } else {
          setMaindata({
            ...data,
            msg: "Your Payment was Not Successfull",
            response: "No Plan is activated for for you",
            showModal: true,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const Submithandler = async () => {
    const submit_data = {
      planid: plan_details.planid,
      gst: data.gst_number,
      amount: data.total,
      currency: plan_details.currency_type,
    };

    try {
      setLoader(true);
      const data = await axios(
        `${IND_ONE_BASE_URL}${PATH.create_order}`,
        {
          method: "POST",
          data: submit_data,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        Razorpay(res.data);
        setLoader(false)
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  if (data.msg && data.showModal) {
    return (
      <Modal
        msg={data.msg}
        show={true}
        hide={ModalHide}
        response={data.response}
      />
    );
  }
  console.log(activeusers)

  return (
    <div>
      {!loader ? (
        <Grid container spacing={2} direction="column" justify="center">
          <div className="confirm_page">
            <div className="confirm_plan_page">
              <p>You are choosing {plan_details.plan_name} for</p>
              <div className="user_count">
                <h4>{data.values ? data.values.length : ""}</h4>
                <h6>users</h6>
              </div>
            </div>
            <div className="App">
              <Select
                isMulti
                onChange={onChange}
                options={activeusers}
                value={data.values}
                checked={true}
                placeholder="Please Select users ..."
              />
            </div>
            <div className="user_plans">
              <div className="sub_plans">
                <p>Business Premium Plan</p>
                <p className="sub_plans_p">₹ {plan_details.cost} / User / Month</p>
              </div>
              <hr />
              <div className="sub_plans">
                <p>Number of Users</p>
                <div className="users_decrement">
                  <input
                    value={data.values ? data.values.length : ""}
                    disabled={true}
                    className="sub_plans_p"
                  ></input>
                </div>
              </div>
              <hr />

              <div className="sub_plans">
                <p>Total</p>
                <p className="sub_plans_p">₹ {data.sub_total} /Total</p>
              </div>
              <hr />

              <div className="sub_plans">
                <p>GST</p>
                <p className="sub_plans_p">18%</p>
              </div>
            </div>
            <div className="sub_plans footer">
              <p>Amount to be paid</p>
              <p ><span>₹ {data.total ? data.total : "0"} </span>/ Month</p>
            </div>

            <div className="checked">
              <div className="toggle">
                <p>Do you want to be GST enabled?</p>
                <Switch
                  checked={data.gst_checked}
                  onChange={handleChange}
                  name="gst_checked"
                  type="checkbox"
                  value={data.gst_checked}
                  inputProps={{ "aria-label": "#FF682B checkbox" }}
                />
              </div>
              {data.gst_checked ? (
                <div className="gst_input">
                  <span>GST Number</span>
                  <input
                    className="gst_input"
                    placeholder="Enter GST Number"
                    onChange={handleChange}
                    name="gst_number"
                    value={data.gst_number}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="footer_button">
            <Button className="upgradebutton" onClick={Submithandler} disabled={data.values.length<=0}>
              CONFIRM
            </Button>
          </div>

        </Grid>
      ) : (
        <Loader msg="Please Wait we are processing your payment" />
      )}
    </div>
  );
}

export default ConfirmPage;
