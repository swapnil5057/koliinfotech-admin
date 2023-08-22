import * as types from '../ActionTypes/OurOpeningsActionTypes'
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
    loadOurOpeningsSuccess, loadOurOpeningsError,
    getSingleOpeningSuccess, getSingleOpeningError,
    deleteOurOpeningsuccess, deleteOurOpeningError,
    addOurOpeningsSuccess, addOurOpeningsError,
    updateOurOpeningsSuccess, updateOurOpeningsError
} from '../Actions/OurOpeningsActions';

import { loadOurOpeningsApi, getSingleOpeningApi, deleteOpeningApi, addOurOpeningApi, updateOpeningApi } from '../APIs/OurOpeningsApi';

import { Link } from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadOurOpeningsStartAsync() {
    try {
        const response = yield call(loadOurOpeningsApi);
        if (response.status === 200) {
            yield put(loadOurOpeningsSuccess(response));
        }
    } catch (error) {
        yield put(loadOurOpeningsError(error));
    }
}
// ----------------------------------------------------------------
export function* onGetSingleOpeningStartAsync({ payload }) {
    try {
        const response = yield call(getSingleOpeningApi, payload)        
        if (response.status === 200) {
            yield put(getSingleOpeningSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleOpeningError(error.response));
    }
}
// // // ----------------------------------------------------------------
export function* onaddOurOpeningsStartAsync({ payload }) {
    try {
        const response = yield call(addOurOpeningApi, payload);
        if (response?.status === 200) {
            yield put(addOurOpeningsSuccess(response));
            // <Link to='/admindashboard/OurEmployees-list'></Link>
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(addOurOpeningsError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.message,
        });
    }
}
// // // ----------------------------------------------------------------
export function* onDeleteOurOpeningStartAsync({ payload }) {
    try {
        const response = yield call(deleteOpeningApi, payload)
        if (response.status === 200) {
            yield put(deleteOurOpeningsuccess(response.data));
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
        yield put(deleteOurOpeningError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.response?.data?.message,
        });
    }
}
// // // ----------------------------------------------------------------
export function* onUpdateOurOpeningsStartAsync({ payload }) {
    try {
        const response = yield call(updateOpeningApi, payload)
        if (response.status === 200) {
            yield put(updateOurOpeningsSuccess(response));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(updateOurOpeningsError(error));
        if(error?.response?.data?.errors?.image) {
            Toast.fire({
                icon: "error",
                title: error?.response?.data?.errors?.image
            })
        }
    }
}
// ----------------------------------------------------------------
export function* onLoadOurOpenings() {
    yield takeLatest(types.LOAD_OUR_OPENING_START, onLoadOurOpeningsStartAsync);
}
export function* onGetSingleOpening() {
    yield takeLatest(types.GET_SINGLE_OPENING_START, onGetSingleOpeningStartAsync);
}
export function* onaddOurOpenings() {
    yield takeLatest(types.ADD_OUR_OPENING_START, onaddOurOpeningsStartAsync);
}
export function* onDeleteOurOpening() {
    yield takeLatest(types.DELETE_OUR_OPENING_START, onDeleteOurOpeningStartAsync);
}
export function* onUpdateOurOpening() {
    yield takeLatest(types.UPDATE_OUR_OPENING_START, onUpdateOurOpeningsStartAsync);
}

const OurOpeningssagas = [
    fork(onLoadOurOpenings),
    fork(onGetSingleOpening),
    fork(onaddOurOpenings),
    fork(onDeleteOurOpening),
    fork(onUpdateOurOpening),
];

export default function* OurOpeningssaga() {
    yield all([...OurOpeningssagas]);
}
