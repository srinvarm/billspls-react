import { IND_ONE_BASE_URL, PATH, ActionType } from "../Constants";
import axios from 'axios'
export const Admin_active_users=(cb)=>async(dispatch,getState)=> {
    const {token=""}=getState().user
    try {
        const uidinsert =await axios(`${IND_ONE_BASE_URL}${PATH.admin_active_users}`, {
            headers: {
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
            },
        })
        .then((res) => {
            console.log(res)
            if (res.status===200){
            dispatch({type:ActionType.ACTIVE_USERS_COMPLETED,payload:res.data})
            cb(true)
            }
        });
    } catch (error) {
        dispatch({type:ActionType.ACTIVE_USERS_FAILED})
        console.log("error", error);
        cb(false)

    }
}
export const Payment_status=(cb)=>async(dispatch,getState)=> {
    const {token=""}=getState().user
    try {
        dispatch({type:ActionType.PAYMENTS_STATUS_REQUEST})
        const uidinsert =await axios(`${IND_ONE_BASE_URL}${PATH.payment_status}`, {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            Authorization:`Bearer ${token}`
            },
        })
        .then((res) => {
            console.log(res)
            if (res.data.status === "Payment Successful"){
            dispatch({type:ActionType.PAYMENTS_STATUS_COMPLETED,payload:res.data.transaction_status})
            cb(true)
            }
        });
    } catch (error) {
        dispatch({type:ActionType.PAYMENTS_STATUS_FAILED})
        console.log("error", error);
        cb(false)

    }
}