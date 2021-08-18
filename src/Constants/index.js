export const BASE_URL_BILL=process.env.REACT_APP_BILLPLS
export const IND_ONE_BASE_URL=process.env.REACT_APP_IND_ONE
export const XERO_BASE_URL=process.env.REACT_APP_XERO
export const APP_XERO_API=process.env.REACT_APP_XERO_API

export const PATH={
    available_plans:"users/available_plans",
    balance:"users/balance",
    payment_status:"payments/payment_status/",
    transactions:"transactions/",
    create_order:"payments/create_order/",
    users:"users/token/",
    admin_active_users:"users/admin_active_users/",
    token:"connect/token",
    connections:"connections",
    invoices:"api.xro/2.0/Invoices"
}

export { default as ActionType } from "./types";