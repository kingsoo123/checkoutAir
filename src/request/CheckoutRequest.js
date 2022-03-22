import axios from "axios";
import config from "../config";



const baseURL = config().secrets.apiHost;


export const startCheckout = async (data) => {
    const response = await axios.post(`${baseURL}/v1/initialize`, data);
    return response;
};

export const initialize_pay = async (data) => {
    const response = await axios.post(`${baseURL}/v1/pay`, data);
    return response;
};



export const showResult = async (data, transId) => {
    const response = await axios.post(`${baseURL}/v1/initialize/${transId}`, data);
    return response;
};



//ea5dcb1083d342f3a070dea705e87122