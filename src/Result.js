import React from 'react'
import { useSelector } from 'react-redux'



const Result = () => {
    const paymentStatus = useSelector(state=>state.initialize_pay)

    console.log(paymentStatus, 'result')


    return (
        <>
            {paymentStatus.result === 'Payment Failed' ? <p>success</p> :  <p>FAILED</p>}
        </>
    )
}



export default Result



//<Redirect to="/somewhere/else" />
