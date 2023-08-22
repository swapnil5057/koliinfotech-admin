import * as types from '../ActionTypes/ContactUsActionTypes';
// ------------------------------------------------------------------
export const loadContactUsStart = () => ({
    type: types.LOAD_CONTACT_US_START,
});

export const loadContactUsSuccess = (status) => ({
    type: types.LOAD_CONTACT_US_SUCCESS,
    payload: status,
});

export const loadContactUsError = (error) => ({
    type: types.LOAD_CONTACT_US_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const getSingleContactStart = (SingleContact) => ({
    type: types.GET_SINGLE_CONTACT_START,
    payload: SingleContact,
});

export const getSingleContactSuccess = (SingleContact) => ({
    type: types.GET_SINGLE_CONTACT_SUCCESS,
    payload: SingleContact,
});

export const getSingleContactError = (error) => ({
    type: types.GET_SINGLE_CONTACT_ERROR,
    payload: error,
})
// ------------------------------------------------------------------
export const deleteContactUsStart = (deleteContact) => ({
    type: types.DELETE_CONTACT_US_START,
    payload: deleteContact,
});

export const deleteContactUsSuccess = (deleteContact) => ({
    type: types.DELETE_CONTACT_US_SUCCESS,
    payload: deleteContact,
});

export const deleteContactUsError = (error) => ({
    type: types.DELETE_CONTACT_US_ERROR,
    payload: error,
});
