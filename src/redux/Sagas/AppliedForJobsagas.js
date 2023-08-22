import * as types from '../ActionTypes/AppliedForJobActionTypes'
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    loadAppliedForJobSuccess, loadAppliedForJobError,
    getSingleAppliedSuccess, getSingleAppliedError,
    deleteAppliedForJobSuccess, deleteAppliedForJobError
} from '../Actions/AppliedForJobActions';

import { loadAppliedForJobApi, getSingleAppliedApi, deleteAppliedApi } from '../APIs/AppliedForJobApi';

import { Link } from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadAppliedForJobStartAsync() {
    try {
        const response = yield call(loadAppliedForJobApi);
        if (response.status === 200) {
            yield put(loadAppliedForJobSuccess(response));
        }
    } catch (error) {
        yield put(loadAppliedForJobError(error));
    }
}
// ----------------------------------------------------------------
export function* onGetSingleAppliedStartAsync({ payload }) {
    try {
        const response = yield call(getSingleAppliedApi, payload)
        if (response.status === 200) {
            yield put(getSingleAppliedSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleAppliedError(error.response));
    }
}
// // ----------------------------------------------------------------
export function* onDeleteAppliedStartAsync({ payload }) {
    try {
        const response = yield call(deleteAppliedApi, payload)
        if (response.status === 200) {
            yield put(deleteAppliedForJobSuccess(response.data));
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
        yield put(deleteAppliedForJobError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.response?.data?.message,
        });
    }
}

export function* onLoadAppliedForJob() {
    yield takeLatest(types.LOAD_APLLIED_JOB_START, onLoadAppliedForJobStartAsync);
}

export function* onGetSingleApplied() {
    yield takeLatest(types.GET_SINGLE_APLLIED_START, onGetSingleAppliedStartAsync);
}
export function* onDeleteApplied() {
    yield takeLatest(types.DELETE_APLLIED_JOB_START, onDeleteAppliedStartAsync);
}

const AppliedForJobsagas = [
    fork(onLoadAppliedForJob),
    fork(onGetSingleApplied),
    fork(onDeleteApplied),
];

export default function* AppliedForJobsaga() {
    yield all([...AppliedForJobsagas]);
}
