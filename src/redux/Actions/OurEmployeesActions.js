import * as types from '../ActionTypes/OurEmployeesActionTypes';
// ------------------------------------------------------------------
export const loadOurEmployeesStart = () => ({
    type: types.LOAD_OUR_EMPLOYEES_START,
});

export const loadOurEmployeesSuccess = (employee) => ({
    type: types.LOAD_OUR_EMPLOYEES_SUCCESS,
    payload: employee,
});

export const loadOurEmployeesError = (error) => ({
    type: types.LOAD_OUR_EMPLOYEES_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const getSingleEmployeeStart = (SingleEmployee) => ({
    type: types.GET_SINGLE_EMPLOYEE_START,
    payload: SingleEmployee,
});

export const getSingleEmployeeSuccess = (SingleEmployee) => ({
    type: types.GET_SINGLE_EMPLOYEE_SUCCESS,
    payload: SingleEmployee,
});

export const getSingleEmployeeError = (error) => ({
    type: types.GET_SINGLE_EMPLOYEE_ERROR,
    payload: error,
})
// // // ------------------------------------------------------------------
export const addOurEmployeesStart = (newEmployee) => ({
    type: types.ADD_OUR_EMPLOYEE_START,
    payload: newEmployee,
});

export const addOurEmployeesSuccess = (newEmployee) => ({
    type: types.ADD_OUR_EMPLOYEE_SUCCESS,
    payload: newEmployee,
});

export const addOurEmployeesError = (error) => ({
    type: types.ADD_OUR_EMPLOYEE_ERROR,
    payload: error,
});
// // // ------------------------------------------------------------------
export const deleteOurEmployeeStart = (deleteOurEmployees) => ({
    type: types.DELETE_OUR_EMPLOYEE_START,
    payload: deleteOurEmployees,
});

export const deleteOurEmployeeSuccess = (deleteOurEmployees) => ({
    type: types.DELETE_OUR_EMPLOYEE_SUCCESS,
    payload: deleteOurEmployees,
});

export const deleteOurEmployeeError = (error) => ({
    type: types.DELETE_OUR_EMPLOYEE_ERROR,
    payload: error,
});
// // // ------------------------------------------------------------------

export const updateOurEmployeesStart = (updateOurEmployees) => ({
    type: types.UPDATE_OUR_EMPLOYEE_START,
    payload: updateOurEmployees,
});

export const updateOurEmployeesSuccess = (updateOurEmployees) => ({
    type: types.UPDATE_OUR_EMPLOYEE_SUCCESS,
    payload: updateOurEmployees,
});

export const updateOurEmployeesError = (error) => ({
    type: types.UPDATE_OUR_EMPLOYEE_ERROR,
    payload: error,
});
