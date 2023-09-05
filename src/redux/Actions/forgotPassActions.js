import * as types from "../ActionTypes/forgotPassActionTypes";

export const addForgotPassStart = (forgotPass) => ({
    type: types.FORGOT_PASS_START,
    payload: forgotPass,
});

export const addForgotPassSuccess = (forgotPass) => ({
    type: types.FORGOT_PASS_SUCCESS,
    payload: forgotPass,
});

export const addForgotPassError = (error) => ({
    type: types.FORGOT_PASS_ERROR,
    payload: error,
});
// -------------------------------------------------------------------
export const changePassStart = (changePass) => ({
    type: types.CHANGE_PASS_START,
    payload: changePass,
});

export const changePassSuccess = (changePass) => ({
    type: types.CHANGE_PASS_SUCCESS,
    payload: changePass,
});

export const changePassError = (error) => ({
    type: types.CHANGE_PASS_ERROR,
    payload: error,
});
// -------------------------------------------------------------------
export const resetPassStart = (resetPass) => ({
    type: types.RESET_PASS_START,
    payload: resetPass,
});

export const resetPassSuccess = (resetPass) => ({
    type: types.RESET_PASS_SUCCESS,
    payload: resetPass,
});

export const resetPassError = (error) => ({
    type: types.RESET_PASS_ERROR,
    payload: error,
});