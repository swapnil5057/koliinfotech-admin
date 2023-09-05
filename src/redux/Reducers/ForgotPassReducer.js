import * as types from "../ActionTypes/forgotPassActionTypes";

const initialState = {
    isLoading: false,
    isSuccess: false,
};

const ForgotPassReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FORGOT_PASS_START:
        case types.CHANGE_PASS_START:
        case types.RESET_PASS_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        case types.FORGOT_PASS_SUCCESS:
        case types.CHANGE_PASS_SUCCESS:
        case types.RESET_PASS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isLoading: false
            };
        case types.FORGOT_PASS_ERROR:
        case types.CHANGE_PASS_ERROR:
        case types.RESET_PASS_ERROR:
            return {
                ...state,
                isSuccess: false,
                isLoading: false
            };
        default:
            return state;
    }
};

export default ForgotPassReducer;
