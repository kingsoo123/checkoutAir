import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BigLogo from "./assets/BigLogo.png"
import logo from "./assets/airvendlogo2.svg"
import cancel from "./assets/cancel.svg"
import secured from "./assets/secured.svg"
import { css } from "@emotion/react";
import { send_initialize_pay, show_result } from "./Actions/Creators/CheckoutAction"
import FadeLoader from "react-spinners/FadeLoader";
import failedImg from "./assets/failed.png";




const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;




var CryptoJS = require("crypto-js");

const Checkout = () => {
    const paymentStatus = useSelector(state=>state.initialize_pay)
    const formRef = useRef(null);
    const dispatch = useDispatch()
const params = useParams()
const [valid] = useState(false)
const [cardNumber, setCardNumber] = useState(null)
const [expiryMonth, setExpiryMonth] = useState(null)
const [expiryYear, setExpiryYear] = useState(null)
const [cvv, setCvv] = useState(null)
    const [checkStatus, setCheckStatus] = useState(false)
    const [showFailed, setShowFailed] = useState(false)
    let [loading, setLoading] = useState(false);

const [post, setPost] = useState('')
    
    
    //console.log(window.location.href, ' from locationmnnnnnn')

    console.log(paymentStatus, 'result')

    //5399832641760040
    const encryptedData = {
        "pan": cardNumber,
        "cvv": cvv,
        "expiry": {
            "month": expiryMonth,
            "year": expiryYear
        }
    }

 console.log(encryptedData, 'from card')

    //var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(encryptedData), 'kmk0603670a0a130043cea4849a5220a').toString();
    let m_key = 'kmk0603670a0a130043cea4849a5220a'
    let key = CryptoJS.enc.Utf8.parse(m_key) // Secret key
    let iv = CryptoJS.enc.Utf8.parse(m_key.substring(0, 16)) //Vector iv
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(encryptedData), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    console.log(ciphertext.toString(), 'from ciphyer texttttttt')

    const data = {
        merchantId: "cl00qk8wc0002bnn1bwirdebh",
        _uid: "f62c0759e7214256a7c782a6ea2f9cac",
        method: "card",
        encryptedData: ciphertext.toString()
    }


    const handleSubmit = (e) => {
        e.preventDefault()
       
        dispatch(send_initialize_pay(data))
        setCheckStatus(true)
        setLoading(true)
        setTimeout(() => {
            setPost('Post')
        }, 3000);
        setTimeout(() => {
            formRef.current.submit();
        }, 3000);


        setTimeout(() => {
            dispatch(show_result(
                {
                    "merchantId": "cl00qk8wc0002bnn1bwirdebh"
                },
                'f62c0759e7214256a7c782a6ea2f9cac'
            ))
        }, 5000);
    }



    useEffect(() => {
        if (paymentStatus.result !== '') {
            console.log(paymentStatus.result, 'from payment failed')
            if (paymentStatus?.result === 'Payment Failed') {
                setLoading(false)
                setShowFailed(true)
            }
        }
    },[paymentStatus.result])
   

    //let newDIV = document.getElementById("code").innerHTML = htsrc
//console.log(newDIV, 'FROM QUERY')

    console.log(params, 'from checkout')

    
    return (
        <Container>
        <First>
        </First>
        <Second>
            <Img>
                <BackDrop>
                    
                </BackDrop>
            </Img>
            </Second>
            <Card>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <img src={logo} alt="logo"/>
                </div>
                <ContentDiv>
                    <CustDetails>
                            <Grayish>Pay</Grayish>
                            <Blackish>N800.00</Blackish>
                    </CustDetails>
                    <CustDetails>
                            <Grayish>ID:</Grayish>
                            <Blackish>5B49a047188af5B49a047188af</Blackish>
                    </CustDetails>
                    <CustDetails>
                            <Grayish>Memo:</Grayish>
                            <Blackish>Payment for delivery</Blackish>
                    </CustDetails>


                    {checkStatus === false ? (
                        <>
                        <TitleDiv>
                        <TitleText>
                        Enter your card details to pay
                    </TitleText>
                    </TitleDiv>

                    <CardNumber>
                        <CardText>
                        Card Number
                        </CardText>
                        <CardInp>
                            <input type="number" className="card_inp" onChange={(e)=>setCardNumber(e.target.value) }/>
                            <InpStatus>
                                {valid === true ? (
                                    <img src={cancel} alt="cancel" width={14} height={14 }/>
                                ) : ""}
                            </InpStatus>
                        </CardInp>
                    </CardNumber>

                    <ExpiryDate>
                        <DateDiv>
                        <CardText>
                        Expiry Date
                        </CardText>
                            <CardDate>
                            <span className="expiration">
                                    <input type="text" name="month" placeholder="mm" maxLength="2" size="2" onChange={(e)=>setExpiryMonth(e.target.value) }/>
                                <span>/</span>
                                    <input type="text" name="year" placeholder="yy" maxLength="2" size="2" onChange={(e)=>setExpiryYear(e.target.value) }/>
                                </span>
                                <InpStatus>
                                {valid === true ? (
                                    <img src={cancel} alt="cancel" width={14} height={14 }/>
                                ) : ""}
                            </InpStatus>
                        </CardDate>
                        </DateDiv>
                        <CvvDiv>
                        <CvvText>
                        CVV
                            </CvvText>
                            <CardCvv>
                                <input type="password" name="cvv" placeholder="cvv" maxLength="3" size="3" className="cvv_inp" onChange={ (e)=>setCvv(e.target.value)}/>
                                <InpStatus>
                                {valid === true ? (
                                    <img src={cancel} alt="cancel" width={14} height={14 }/>
                                ) : ""}
                            </InpStatus>
                        </CardCvv>
                     </CvvDiv>
                    </ExpiryDate>
                        </>
                    ) : (
                            <div style={{width:'100%', height: 280, display:'flex', justifyContent:'center', alignItems:'center'}}>
                            {loading === true ? <FadeLoader loading={loading} css={override} size={10} color={"#493CD1"} /> : showFailed === true ? <imgh src={failedImg} alt="failed"/> : 'not failed' }
                            </div>
                    )}
                    <CardButton onClick={handleSubmit}>
                    Continue
                    </CardButton>
                    <CardFooter>
                    <img src={secured} alt="secured"/>
                    </CardFooter>
                </ContentDiv>
            </Card>
            <form ref={formRef} name="echoForm" action="https://mtf.gateway.mastercard.com/acs/MastercardACS/a6360ad7-fc7e-4a10-af18-69aeeb9f1702" method={post} id="formurl" target="https://mtf.gateway.mastercard.com/acs/MastercardACS/a6360ad7-fc7e-4a10-af18-69aeeb9f1702">
            <input type="hidden" name="PaReq" value="eAFVUttugkAQfTfxHwjPLbtcllIzrkHFS4yEKE0a3xA2SiugiFVf+zH9sH5JZ1Fru+GBc87OcOYM0DllG+VDlPu0yNuqrlFVEXlcJGm+aqsv4eDRUTu82YBwXQrRn4v4UAoOU7HfRyuhpAnWUDy6RU3TdKjKIXBnYsfh2pNjS80AcoNYWsbrKK84RPGuO/Y5wzpmArlCyEQ57vNh2LWY/eQ8e1QHcuEgjzIhFdefKFNv1hu5fqiE3jwEUksQF4e8Ks/csSiQG4BDueHrqtq2CDkej9qqWkb5uxYXGRApAbl7Cg7S3R5HPKUJD/1J0FuuBq8sSexQvC2TRZCed4uj7bWByBuQRJXgBjXkYym609KNloXT1DxEmTTE/aGvfH9+6Q+YlEbR2pWHrfyce7lU54jaXw4w7hL3cebMtnGiGwJx2ha5wNYY7e87kLv93kgGHFcYJdMN02JyS/VxZNS1ILukmJbB6KWNBEBkKbluEaOpN43Mvz+g2fgBSw+2Mg=="/><br/><br/>
            <input type="hidden" name="TermUrl" value="http://paymentservice-env.eba-75m6a2xq.us-east-1.elasticbeanstalk.com/v1/pay/KrerzTmxWN1ZERnIqxGRXIg6dftagJT_1Ab73ajXwzwZOYQz-EPfAMAvZa16_KDpkwgwKUcqCqJKUWZXcHU0Qw=="/><br/><br/>
            <input type="hidden" name="MD" value=""/>
            </form>
    </Container>
    )
}




const Card = styled.div`
width: 440px;
height: 610px;
position:fixed;
margin-top: 3rem;
`;


const Container = styled.div`
width: 100%;
background:  #EBECF2;
display:flex;
justify-content: space-around;
`;

const First = styled.div`
width: 45%;
height: 100vh;
`;

const Second = styled.div`
width: 45%;
display:flex;
flex-direction: column;
justify-content: center;
`;

const Img = styled.div`
width: 100%;
height: 90%;
background-position: 0 0;
background-repeat: no-repeat;
background-image: url(${BigLogo});
background-size: cover;
opacity: 0.1;
`;

const BackDrop = styled.div`
width: 100%;
height: 100%;
background: linear-gradient(180deg, rgba(19, 17, 63, 0.5) 0%,  90.01%);
`;

const ContentDiv = styled.div`
width:100%;
height:100%;
margin-top: 2rem;
background: #FFFFFF;
border-radius: 8px;
padding-right:1rem;
`;

const CustDetails = styled.div`
width:100%;
display:flex;
justify-content:flex-end;
padding-top:0.5rem;
padding-right:1rem;
`;

const Grayish = styled.p`
font-style: normal;
font-weight: normal;
font-size: 10px;
line-height: 21px;
color: #9A9FBF;
`;

const Blackish = styled.p`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 14px;
color: #000;
`;

const TitleDiv = styled.div`
width:100%;
margin-top: 4rem;
display:flex;
justify-content:center;
`;

const TitleText = styled.p`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 17px;
color: #130F40;
`;

const CardNumber = styled.div`
width:100%;
`;

const CardText = styled.p`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 120%;
color: #000000;
margin-left: 2.5rem;
`;

const CardInp = styled.div`
width: 83%;
height: 45px;
background:#F5F5F9;
border-radius: 8px;
margin-left: 2.5rem;
display:flex;
justify-content:space-between;
`;

const InpStatus = styled.div`
width: 8%;
height: 43px;
margin-right:0.5rem;
display:flex;
justify-content:center;
align-items:center;
`;

const ExpiryDate = styled.div`
width:100%;
margin-top: 1rem;
display:flex;
`;


const DateDiv = styled.div`
width: 50%;
`;
const CardDate = styled.div`
width: 80%;
height:45px;
margin-left: 2.5rem;
background:#F5F5F9;
border-radius: 8px;
display:flex;
justify-content:space-between;
`;

const CvvDiv = styled.div`
width: 50%;
`;

const CardCvv = styled.div`
width: 80%;
height:45px;
background:#F5F5F9;
border-radius: 8px;
display:flex;
justify-content:space-between;
`;

const CvvText = styled.p`
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 120%;
color: #000000;
`;
const CardButton = styled.button`
width: 80%;
height: 45px;
background: #FFFFFF;
border: 1px solid rgba(154, 159, 191, 0.2);
border-radius: 8px;
margin-top: 5rem;
margin-left:2.5rem;
`;

const CardFooter = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items:center;
`;

export default Checkout