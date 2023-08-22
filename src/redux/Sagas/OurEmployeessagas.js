import * as types from '../ActionTypes/OurEmployeesActionTypes'
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
    loadOurEmployeesSuccess, loadOurEmployeesError,
    getSingleEmployeeSuccess, getSingleEmployeeError,
    deleteOurEmployeeSuccess, deleteOurEmployeeError,
    addOurEmployeesSuccess, addOurEmployeesError,
    updateOurEmployeesSuccess, updateOurEmployeesError
} from '../Actions/OurEmployeesActions';
import {
    loadOurEmployeesApi, getsingleEmployeeApi,
    deleteEmployeeApi, addOurEmployeeApi, updateEmployeeApi
} from '../APIs/OurEmployeesApi';

import { Link } from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadOurEmployeesStartAsync() {
    try {
        const response = yield call(loadOurEmployeesApi);
        if (response.status === 200) {
            yield put(loadOurEmployeesSuccess(response));
        }
    } catch (error) {
        yield put(loadOurEmployeesError(error));
    }
}
// ----------------------------------------------------------------
export function* onGetSingleEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(getsingleEmployeeApi, payload)
        console.log('get single employee!~~~~~~~>',response)
        if (response.status === 200) {
            yield put(getSingleEmployeeSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleEmployeeError(error.response));
    }
}
// // ----------------------------------------------------------------
export function* onaddOurEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(addOurEmployeeApi, payload);
        console.log('add employee!~~~~~~~>', response)
        if (response?.status === 200) {
            yield put(addOurEmployeesSuccess(response));
            // <Link to='/admindashboard/OurEmployees-list'></Link>
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(addOurEmployeesError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.message,
        });
    }
}
// // ----------------------------------------------------------------
export function* onDeleteOurEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(deleteEmployeeApi, payload)
        if (response.status === 200) {
            yield put(deleteOurEmployeeSuccess(response.data));
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
        yield put(deleteOurEmployeeError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.response?.data?.message,
        });
    }
}
// // ----------------------------------------------------------------
export function* onUpdateOurEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(updateEmployeeApi, payload)
        if (response.status === 200) {
            yield put(updateOurEmployeesSuccess(response));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(updateOurEmployeesError(error));
        if(error?.response?.data?.errors?.image) {
            Toast.fire({
                icon: "error",
                title: error?.response?.data?.errors?.image
            })
        }
    }
}
// ----------------------------------------------------------------
export function* onLoadOurEmployees() {
    yield takeLatest(types.LOAD_OUR_EMPLOYEES_START, onLoadOurEmployeesStartAsync);
}
export function* onGetSingleEmployee() {
    yield takeLatest(types.GET_SINGLE_EMPLOYEE_START, onGetSingleEmployeeStartAsync);
}
export function* onaddOurEmployee() {
    yield takeLatest(types.ADD_OUR_EMPLOYEE_START, onaddOurEmployeeStartAsync);
}
export function* onDeleteOurEmployee() {
    yield takeLatest(types.DELETE_OUR_EMPLOYEE_START, onDeleteOurEmployeeStartAsync);
}
export function* onUpdateOurEmployee() {
    yield takeLatest(types.UPDATE_OUR_EMPLOYEE_START, onUpdateOurEmployeeStartAsync);
}

const OurEmployeessagas = [
    fork(onLoadOurEmployees),
    fork(onGetSingleEmployee),
    fork(onaddOurEmployee),
    fork(onDeleteOurEmployee),
    fork(onUpdateOurEmployee),
];

export default function* OurEmployeessaga() {
    yield all([...OurEmployeessagas]);
}
