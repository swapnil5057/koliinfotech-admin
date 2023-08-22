import * as types from '../ActionTypes/OurEmployeesActionTypes';

const initialState = {
    OurEmployees: [],
    SingleEmployee: [],
    isLoading: false,
    isSuccess: false,
}

const OurEmployeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_OUR_EMPLOYEES_START:
        case types.GET_SINGLE_EMPLOYEE_START:
        case types.ADD_OUR_EMPLOYEE_START:
        case types.UPDATE_OUR_EMPLOYEE_START:
        case types.DELETE_OUR_EMPLOYEE_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        case types.LOAD_OUR_EMPLOYEES_SUCCESS:
            return {
                ...state,
                OurEmployees: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.GET_SINGLE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                SingleEmployee: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.ADD_OUR_EMPLOYEE_SUCCESS:
        case types.UPDATE_OUR_EMPLOYEE_SUCCESS:
        case types.DELETE_OUR_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case types.LOAD_OUR_EMPLOYEES_ERROR:
        case types.GET_SINGLE_EMPLOYEE_ERROR:
        case types.ADD_OUR_EMPLOYEE_ERROR:
        case types.UPDATE_OUR_EMPLOYEE_ERROR:
        case types.DELETE_OUR_EMPLOYEE_ERROR:
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

export default OurEmployeesReducer;