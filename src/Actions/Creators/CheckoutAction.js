import TYPES from "../Constant/CheckoutConstant";
import { initialize_pay, showResult, startCheckout } from "../../request/CheckoutRequest"



const { INITIALIZE_PAY_SUCCESS, SHOW_RESULT, START_CHECKOUT } = TYPES



export const start_checkout = (data) => {
    return (dispatch) => {
        const response = startCheckout(data)
        response.then(res => {
            dispatch({ type: START_CHECKOUT, payload: res?.data })
            //console.log(res?.data, 'from html start checkout action')
        })
            // .catch(error => {
            //     //console.log(error, 'from error messssss')
            //     dispatch({type:USER_AUTH_NOT_LOGIN, payload: "login failed"})
            // })
    }
}

export const send_initialize_pay = (data) => {
    return (dispatch) => {
        const response = initialize_pay(data)
        response.then(res => {
            dispatch({ type: INITIALIZE_PAY_SUCCESS, payload: res?.data?._htmlcontent })
            //console.log(res?.data?._htmlcontent, 'from html content action')
        })
            // .catch(error => {
            //     //console.log(error, 'from error messssss')
            //     dispatch({type:USER_AUTH_NOT_LOGIN, payload: "login failed"})
            // })
    }
}







export const show_result = (data, transId) => {
    return (dispatch) => {
        const response = showResult(data, transId)
        response.then(res => {
            dispatch({ type: SHOW_RESULT, payload: res?.data?._order?._paymentStatus })
            //console.log(res?.data?._order?._paymentStatus, 'from RESULT action')
        })
            .catch(error => {
                //console.warn(error, 'from error resultttttt')
                //dispatch({type:USER_AUTH_NOT_LOGIN, payload: "login failed"})
            })
    }
}


