import { BASE_URL_BILL, PATH, ActionType,XERO_BASE_URL,APP_XERO_API } from "../Constants";
import axios from "axios";
import { config } from "../Config";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';

export const Balance = () => async (dispatch, getState) => {
    const {token=""}=getState().user
    console.log(token)
    try {
    dispatch({ type: ActionType.BALANCE_REQUEST });
      const uidinsert =await axios(`${BASE_URL_BILL}${PATH.balance}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin":"*"
        },
      }).then((res) => {
        dispatch({ type: ActionType.BALANCE_COMPLETED,payload:res.data });
        console.log(res);
      });
    } catch (error) {
        dispatch({ type: ActionType.BALANCE_FAILED });
        if (error.response){
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
        }
      
    }
  }
export const Token=()=>(dispatch,getState)=> {
    const {token} = getState().user
    const urlElements = window.location;
    var url = new URL(urlElements);
    let token1 = url.searchParams.get("token");
    console.log(token1)
    if(token1){
      dispatch({type:ActionType.USER_TOKEN_COMPLETED,token:token1})
    }
}
export const Logout=()=>(dispatch,getState)=> {
    dispatch({type:ActionType.LOGOUT})
}
export const Available_plans=()=>async(dispatch,getState)=> {
    const {token=""}=getState().user
    try {
        dispatch({type:ActionType.AVAILABLE_PLANS_REQUEST})
        const uidinsert =await axios(`${BASE_URL_BILL}${PATH.available_plans}`, {
            headers: {
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
            },
        })
        .then((res) => {
            console.log(res.data)
            dispatch({type:ActionType.AVAILABLE_PLANS_COMPLETED,payload:res.data["available_plans"]})
        });
    } catch (error) {
        dispatch({type:ActionType.AVAILABLE_PLANS_FAILED})
        console.log("error", error);
    }
}

export const XeroToken=(code)=>async(dispatch,getState)=> {
  let formData = new FormData();
  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("redirect_uri", config.redirectUri);
  try {
      // dispatch({type:ActionType.AVAILABLE_PLANS_REQUEST})
      const Token =await axios(`${XERO_BASE_URL}${PATH.token}`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            base64_encode(config.clientId + ":" + config.clientSecret),
        },
      })
      if (Token.status === 200) {
        const access_token = Token.data.access_token;
        console.log(access_token);
        let decoded = jwt_decode(access_token);
        console.log(decoded);
        localStorage.setItem("token",access_token)
        dispatch(Connections(access_token))
      }
  } catch (error) {
      dispatch({type:ActionType.AVAILABLE_PLANS_FAILED})
      console.log("error", error);
  }
}

export const Connections=(token1)=>async(dispatch,getState)=> {
  try {
      // dispatch({type:ActionType.AVAILABLE_PLANS_REQUEST})
      const connection =await axios.get(`${APP_XERO_API}${PATH.connections}`, {
        headers: {
          Authorization: `Bearer ${token1}`,
        }
      })
      if (connection.status===200) {
        const tenantid=connection.data.map((data,id)=> {
          console.log(id,data)
          dispatch(Invoices(token1,data.tenantId))
          return id
        })
        console.log(tenantid)
      }
  } catch (error) {
      console.log("error", error);
  }
}
export const Invoices=(token1,tenantId)=>async(dispatch,getState)=> {
  try {
      const Invoices =await axios.get(`${APP_XERO_API}${PATH.invoices}`, {
        headers: {
          Authorization: `Bearer ${token1}`,
          "Xero-tenant-id":tenantId
        }
      })
      console.log(Invoices)
  } catch (error) {
      console.log("error", error);
  }
}


