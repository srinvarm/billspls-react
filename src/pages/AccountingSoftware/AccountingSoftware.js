import React,{useEffect} from 'react'
import './AccountingSoftware.css'
import PowerAutomate from '../../Images/PowerAutomate.png'
import xero from '../../Images/xero.png'
import blueprism from '../../Images/blueprism.png'
import quick from '../../Images/quick.png'
import {config} from '../../Config'
import {XeroToken} from '../../Actions'
import { useDispatch,useSelector } from 'react-redux';

import { Button } from '@material-ui/core'
function AccountingSoftware() {
    const dispatch = useDispatch()
    const GetApiKey=()=> {
        window.open("https://one.in-d.ai/", "_blank")
    }
    const Xero = () => {
        window.open(
          `https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=accounting.transactions&state=123`,
          "_blank"
        );
    };
    useEffect(() => {
        const urlElements = window.location;
        let url = new URL(urlElements);
        let code = url.searchParams.get("code");
        let state = url.searchParams.get("state");
        console.log(code, state);
        if (code && state) {
            dispatch(XeroToken(code))
        }
      }, []);
    return (
        <div>
            <div>
                <div className="accounting_heading">BillsPls to Accounting Software</div>
                <div className="d-flex account_image">
                    <img src={xero} />
                    <Button className="api_key_button" onClick={Xero}>Sign in with xero</Button>
                </div>
                <div className="d-flex account_image rpa">
                    <img src={quick} />
                    <Button className="api_key_button">Coming Soon</Button>
                </div>
            </div>
            <div>
                <div className="accounting_heading">BillsPls to RPA</div>
                <div className="d-flex account_image rpa">
                    <img src={blueprism} />
                    <Button className="api_key_button" onClick={GetApiKey}>Get API Key</Button>
                </div>
                <div className="d-flex account_image rpa">
                    <img src={PowerAutomate} />
                    <Button className="api_key_button" onClick={GetApiKey}>Get API Key</Button>
                </div>
            </div>
        </div>
    )
}

export default AccountingSoftware
