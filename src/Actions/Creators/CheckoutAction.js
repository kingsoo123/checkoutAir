import TYPES from "../Constant/CheckoutConstant";
import { initialize_pay, showResult } from "../../request/CheckoutRequest"



const { INITIALIZE_PAY_SUCCESS, SHOW_RESULT } = TYPES


export const send_initialize_pay = (data) => {
    return (dispatch) => {
        const response = initialize_pay(data)
        response.then(res => {
            dispatch({ type: INITIALIZE_PAY_SUCCESS, payload: 'hello' })
            console.log(res?.data?._htmlcontent, 'from success action')
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
            console.log(res?.data?._order?._paymentStatus, 'from RESULT action')
        })
            .catch(error => {
                console.warn(error, 'from error resultttttt')
                //dispatch({type:USER_AUTH_NOT_LOGIN, payload: "login failed"})
            })
    }
}


