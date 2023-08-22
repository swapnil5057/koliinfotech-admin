import * as types from '../ActionTypes/OurTopBlogsActionTypes'
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
    loadOurTopBlogsSuccess, loadOurTopBlogsError,
    getSingleBlogSuccess, getSingleBlogError,
    addOurBlogSuccess, addOurBlogError,
    deleteOurBlogSuccess, deleteOurBlogError,
    updateOurBlogSuccess, updateOurBlogError
} from '../Actions/OurTopBlogsAction';

import {
    loadOurTopBlogsApi,
    getSingleBlogApi,
    addOurBlogApi,
    deleteOurBlogApi,
    updateOurBlogApi
} from '../APIs/OurTopBlogsApi';

import { Link } from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadOurTopBlogsStartAsync() {
    try {
        const response = yield call(loadOurTopBlogsApi);
        if (response.status === 200) {
            yield put(loadOurTopBlogsSuccess(response));
        }
    } catch (error) {
        yield put(loadOurTopBlogsError(error));
    }
}
// ----------------------------------------------------------------
export function* onGetSingleBlogStartAsync({ payload }) {
    try {
        const response = yield call(getSingleBlogApi, payload)
        if (response.status === 200) {
            yield put(getSingleBlogSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleBlogError(error.response));
    }
}
// // ----------------------------------------------------------------
export function* onaddOurBlogStartAsync({ payload }) {
    try {
        const response = yield call(addOurBlogApi, payload);
        console.log('top blog response~~~~~~>', response)
        if (response?.status === 200) {
            yield put(addOurBlogSuccess(response.data));
            <Link to='/admindashboard/ourOurTopBlogs-list'></Link>
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(addOurBlogError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.errors.image

        });
    }
}
// // ----------------------------------------------------------------
export function* onDeleteOurBlogStartAsync({ payload }) {
    try {
        const response = yield call(deleteOurBlogApi, payload)
        // console.log('top blog response~~~~~~>', response)
        if (response.status === 200) {
            yield put(deleteOurBlogSuccess(response.data));
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
        yield put(deleteOurBlogError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.response?.data?.message,
        });
    }
}
// // ----------------------------------------------------------------
export function* onUpdateOurBlogStartAsync({ payload }) {
    try {
        const response = yield call(updateOurBlogApi, payload)
        console.log('update service response~~~~~>',response)
        if (response.status === 200) {
            yield put(updateOurBlogSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data,
            });
        }
    } catch (error) {
        yield put(updateOurBlogError(error));
        if(error?.response?.data?.title) {
            Toast.fire({
                icon: "error",
                title: error.response.data.title,
            })
        }else if(error?.response?.data?.description) {
            Toast.fire({
                icon: "error",
                title: error.response.data.description,
            })
        } else if(error?.response?.data.image) {
            Toast.fire({
                icon: "error",
                title: error.response.data.image,
            })
        } else if(error?.response?.data?.file){
            Toast.fire({
                icon: "error",
                title: error.response.data.file,
            })
        } else {
            Toast.fire({
                icon: "error",
                title: error?.response?.data?.type_of_av,
            })
        }
    }
}
// ----------------------------------------------------------------


export function* onLoadOurTopBlogs() {
    yield takeLatest(types.LOAD_OUR_BLOG_START, onLoadOurTopBlogsStartAsync);
}

export function* onGetSingleBlog() {
    yield takeLatest(types.GET_SINGLE_BLOG_START, onGetSingleBlogStartAsync);
}
export function* onaddOurBlog() {
    yield takeLatest(types.ADD_OUR_BLOG_START, onaddOurBlogStartAsync);
}
export function* onDeleteOurBlog() {
    yield takeLatest(types.DELETE_OUR_BLOG_START, onDeleteOurBlogStartAsync);
}
export function* onUpdateOurBlog() {
    yield takeLatest(types.UPDATE_OUR_BLOG_START, onUpdateOurBlogStartAsync);
}

const OurTopBlogsagas = [
    fork(onLoadOurTopBlogs),
    fork(onGetSingleBlog),
    fork(onaddOurBlog),
    fork(onDeleteOurBlog),
    fork(onUpdateOurBlog),
];

export default function* OurTopBlogsaga() {
    yield all([...OurTopBlogsagas]);
}
