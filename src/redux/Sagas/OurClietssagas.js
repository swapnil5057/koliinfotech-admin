import * as types from "../ActionTypes/OurClientsActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";


import {
    loadClintsSuccess, loadClintsError,
    getSingleClientsSuccess, getSingleClientsError,
    addOurClientSuccess, addOurClientError,
    deleteClientSuccess, deleteClientError,
    UpdateClientSuccess, UpdateClientError
} from "../Actions/OurClintsActions";
import {
    loadClientsApi,
    getSingleClientApi,
    AddOurClientApi,
    deleteOurClientApi,
    updateClientApi
} from "../APIs/OurClientsApi";


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadOurClientsStartAsync() {
    try {
        const response = yield call(loadClientsApi);
        console.log('load client saga response~~~~~~>', response)
        if (response.status === 200) {
            yield put(loadClintsSuccess(response));
        }
    } catch (error) {
        yield put(loadClintsError(error));
    }
}
// // ----------------------------------------------------------------
export function* onSigleClientStartAsync({ payload }) {
    console.log('get single client saga payload~~~~>', payload)
    try {
        const response = yield call(getSingleClientApi, payload);
        console.log('get single client saga response~~~~>', response)
        if (response.status === 200) {
            yield put(getSingleClientsSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleClientsError(error.response));
    }
}
// ----------------------------------------------------------------
export function* onaddOurClientStartAsync({ payload }) {
    try {
        const response = yield call(AddOurClientApi, payload);
        console.log('add client saga response~~>', response)
        if (response?.data?.status === 200) {
            yield put(addOurClientSuccess(response?.data));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(addOurClientError(error.response));
    }
}
// // -----------------------------------------------------------------------------------------------

export function* onDeleteClientStartAsync({ payload }) {
    try {
        const response = yield call(deleteOurClientApi, payload);
        if (response.data.status === 200) {
            yield put(deleteClientSuccess(response));
            Toast.fire({
                icon: "success",
                title: "Users Deleted SuccessFully",
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(deleteClientError(error.response));
    }
}
// // ----------------------------------------------------------------
export function* onClientUpdateStartAsync({ payload }) {
    try {
        const response = yield call(updateClientApi, payload);
        if (response?.status === 200) {
            yield put(UpdateClientSuccess(response));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response?.data?.detail,
            });
            return response;
        }
    } catch (error) {
        yield put(UpdateClientError(error.response));
        if (error.response.data.detail) {
            Toast.fire({
                icon: "error",
                title: error.response.data.detail,
            });
        }
    }
}

// ----------------------------------------------------------------
export function* onLoadOurClients() {
    yield takeLatest(types.LOAD_CLIENTS_START, onLoadOurClientsStartAsync);
}

export function* onGetSingleClient() {
    yield takeLatest(types.GET_SINGLE_CLIENTS_START, onSigleClientStartAsync);
}

export function* onAddClientStart() {
    yield takeLatest(types.ADD_OUR_CLIENT_START, onaddOurClientStartAsync);
}
export function* onDeleteClient() {
    yield takeLatest(types.DELETE_CLIENT_START, onDeleteClientStartAsync);
}

export function* onClientUpdate() {
    yield takeLatest(types.UPDATE_CLIENTS_START, onClientUpdateStartAsync);
}

const OurClientsSagas = [
    fork(onLoadOurClients),
    fork(onGetSingleClient),
    fork(onAddClientStart),
    fork(onDeleteClient),
    fork(onClientUpdate),
];

export default function* OurClientsSaga() {
    yield all([...OurClientsSagas]);
}