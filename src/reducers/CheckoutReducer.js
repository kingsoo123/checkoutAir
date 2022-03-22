import  TYPES  from "../Actions/Constant/CheckoutConstant"




const { INITIALIZE_PAY_SUCCESS, SHOW_RESULT, START_CHECKOUT } = TYPES


const initiaState = {
    data: {},
    result: '',
    startCheck:{}
}



export const initializeReducer = (state = initiaState, action) => {
    switch (action.type) {
        case START_CHECKOUT:
            return {
                ...state,
                startCheck:action.payload
            }
        case INITIALIZE_PAY_SUCCESS:
            return {
                ...state,
              data: action.payload
            };
        
        case SHOW_RESULT:
            return {
                ...state,
                result: action?.payload
            }
        
        
            default:
                return state;
    }
}