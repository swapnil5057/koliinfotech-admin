import * as types from '../ActionTypes/ContactUsActionTypes'
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    loadContactUsSuccess, loadContactUsError,
    getSingleContactSuccess, getSingleContactError,
    deleteContactUsSuccess, deleteContactUsError
} from '../Actions/ContactUsActions';

import { loadContactUsApi,getSingleContactApi,deleteContactApi } from '../APIs/ContactusApi';

import { Link } from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadContactStartAsync() {
    try {
        const response = yield call(loadContactUsApi);
        if (response.status === 200) {
            yield put(loadContactUsSuccess(response));
        }
    } catch (error) {
        yield put(loadContactUsError(error));
    }
}
// ----------------------------------------------------------------
export function* onGetSingleContactStartAsync({ payload }) {
    try {
        const response = yield call(getSingleContactApi, payload)
        if (response.status === 200) {
            yield put(getSingleContactSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleContactError(error.response));
    }
}
// // ----------------------------------------------------------------
export function* onDeleteContactStartAsync({ payload }) {
    try {
        const response = yield call(deleteContactApi, payload)
        if (response.status === 200) {
            yield put(deleteContactUsSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(deleteContactUsError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.response?.data?.message,
        });
    }
}

export function* onLoadContactUs() {
    yield takeLatest(types.LOAD_CONTACT_US_START, onLoadContactStartAsync);
}

export function* onGetSingleContact() {
    yield takeLatest(types.GET_SINGLE_CONTACT_START, onGetSingleContactStartAsync);
}
export function* onDeleteContact() {
    yield takeLatest(types.DELETE_CONTACT_US_START, onDeleteContactStartAsync);
}

const contactUssagas = [
    fork(onLoadContactUs),
    fork(onGetSingleContact),
    fork(onDeleteContact),
];

export default function* ContactUssaga() {
    yield all([...contactUssagas]);
}
