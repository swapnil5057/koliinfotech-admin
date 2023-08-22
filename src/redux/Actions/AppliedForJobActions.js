import * as types from '../ActionTypes/AppliedForJobActionTypes';
// ------------------------------------------------------------------
export const loadAppliedForJobStart = () => ({
    type: types.LOAD_APLLIED_JOB_START,
});

export const loadAppliedForJobSuccess = (status) => ({
    type: types.LOAD_APLLIED_JOB_SUCCESS,
    payload: status,
});

export const loadAppliedForJobError = (error) => ({
    type: types.LOAD_APLLIED_JOB_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const getSingleAppliedStart = (SingleApplied) => ({
    type: types.GET_SINGLE_APLLIED_START,
    payload: SingleApplied,
});

export const getSingleAppliedSuccess = (SingleApplied) => ({
    type: types.GET_SINGLE_APLLIED_SUCCESS,
    payload: SingleApplied,
});

export const getSingleAppliedError = (error) => ({
    type: types.GET_SINGLE_APLLIED_ERROR,
    payload: error,
})
// ------------------------------------------------------------------
export const deleteAppliedForJobStart = (deleteApplied) => ({
    type: types.DELETE_APLLIED_JOB_START,
    payload: deleteApplied,
});

export const deleteAppliedForJobSuccess = (deleteApplied) => ({
    type: types.DELETE_APLLIED_JOB_SUCCESS,
    payload: deleteApplied,
});

export const deleteAppliedForJobError = (error) => ({
    type: types.DELETE_APLLIED_JOB_ERROR,
    payload: error,
});
