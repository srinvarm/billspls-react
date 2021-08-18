import React, { useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { BASE_URL_BILL, PATH, ActionType } from "../Constants";
import jwt_decode from "jwt-decode";
import {Token } from '../Actions'

const  Login=(props)=> {
const dispatch=useDispatch()
dispatch(Token())
  const {token,isLoggedIn} = useSelector(({user})=>user)
   if (token&&jwt_decode(token).exp < Date.now() / 1000){
     setTimeout(() => {
    dispatch({type:ActionType.USER_TOKEN_FAILED,token:null})
       
     }, 4000);
    }

  
  return (
    <div>
    {!isLoggedIn?
      <p>Please pass token in url to authenticate user</p>:""}
    </div>
  );
}

export default Login;
