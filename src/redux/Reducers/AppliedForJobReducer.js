import * as types from '../ActionTypes/AppliedForJobActionTypes';

const initialState = {
    AppliedForJobList: [],
    SingleApplied: [],
    isLoading: false,
    isSuccess: false,
}

const AppliedForJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_APLLIED_JOB_START:
        case types.DELETE_APLLIED_JOB_START:
        case types.GET_SINGLE_APLLIED_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        case types.LOAD_APLLIED_JOB_SUCCESS:
            return {
                ...state,
                AppliedForJobList: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.GET_SINGLE_APLLIED_SUCCESS:
            return {
                ...state,
                SingleApplied: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.DELETE_APLLIED_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case types.LOAD_APLLIED_JOB_ERROR:
        case types.DELETE_APLLIED_JOB_ERROR:
        case types.GET_SINGLE_APLLIED_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        default:
            return state;
    }
}

export default AppliedForJobReducer;