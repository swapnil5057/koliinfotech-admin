import * as types from "../ActionTypes/forgotPassActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    addForgotPassSuccess, addForgotPassError,
    changePassSuccess, changePassError,
    resetPassSuccess, resetPassError
} from "../Actions/forgotPassActions";
import {
    ForgotPassApi,
    ChangePassApi,
    ResetPassApi
} from "../APIs/ForgotPassApi";


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onForgotPassStartAsync({ payload }) {
    try {
        const response = yield call(ForgotPassApi, payload);
        if (response?.data?.status === 200) {
            yield put(addForgotPassSuccess(response?.data));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: 'Email not found',
            });
        }
    } catch (error) {
        yield put(addForgotPassError(error.response));
    }
}
// ----------------------------------------------------------------
export function* onChangePassStartAsync({ payload }) {
    console.log('change pass payload~~>', payload)
    try {
        const response = yield call(ChangePassApi, payload);
        console.log('change pass response~~>', response)
        if (response?.data?.status === 200) {
            yield put(changePassSuccess(response?.data));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: 'Email not found',
            });
        }
    } catch (error) {
        yield put(changePassError(error.response));
        console.log('change passs error~~~>',error?.response?.data?.message)
        Toast.fire({
            icon: "error",
            title: error?.response?.data?.message,
        });
    }
}
// ----------------------------------------------------------------
export function* onResetPassStartAsync({ payload }) {
    console.log('reset pass payload~~>',payload)
    try {
        const response = yield call(ResetPassApi, payload);
        console.log('reset pass response~~>',response)
        if (response?.data?.status === 200) {
            yield put(resetPassSuccess(response?.data));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: 'Email not found',
            });
        }
    } catch (error) {
        yield put(resetPassError(error.response));
    }
}

// ----------------------------------------------------------------
export function* onForgotPassStart() {
    yield takeLatest(types.FORGOT_PASS_START, onForgotPassStartAsync);
}
export function* onResetPassStart() {
    yield takeLatest(types.RESET_PASS_START, onResetPassStartAsync);
}
export function* onChangePassStart() {
    yield takeLatest(types.CHANGE_PASS_START, onChangePassStartAsync);
}

const ForgotPassSagas = [
    fork(onForgotPassStart),
    fork(onResetPassStart),
    fork(onChangePassStart),
];

export default function* ForgotPassSaga() {
    yield all([...ForgotPassSagas]);
}