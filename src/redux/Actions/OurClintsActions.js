import * as types from "../ActionTypes/OurClientsActionTypes";

export const loadClintsStart = () => ({
    type: types.LOAD_CLIENTS_START, 
});

export const loadClintsSuccess = (client) => ({
    type: types.LOAD_CLIENTS_SUCCESS,
    payload: client,
});

export const loadClintsError = (error) => ({
    type: types.LOAD_CLIENTS_ERROR,
    payload: error,
});
// ----------------------------------------------------------------------
export const getSingleClientsStart = (singleClient) => ({
    type: types.GET_SINGLE_CLIENTS_START,
    payload: singleClient,
});

export const getSingleClientsSuccess = (singleClient) => ({
    type: types.GET_SINGLE_CLIENTS_SUCCESS,
    payload: singleClient,
});

export const getSingleClientsError = (error) => ({
    type: types.GET_SINGLE_CLIENTS_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const addOurClientStart = (newClient) => ({
    type: types.ADD_OUR_CLIENT_START,
    payload: newClient,
});

export const addOurClientSuccess = (newClient) => ({
    type: types.ADD_OUR_CLIENT_SUCCESS,
    payload: newClient,
});

export const addOurClientError = (error) => ({
    type: types.ADD_OUR_CLIENT_ERROR,
    payload: error,
});
// ----------------------------------------------------------------------
export const UpdateClientStart = (client) => ({
    type: types.UPDATE_CLIENTS_START,
    payload: client,
});

export const UpdateClientSuccess = (client) => ({
    type: types.UPDATE_CLIENTS_SUCCESS,
    payload: client,
});

export const UpdateClientError = (error) => ({
    type: types.UPDATE_CLIENTS_ERROR,
    payload: error,
});
// // ---------------------------------------------------------

export const deleteClientStart = (clientId) => ({
    type: types.DELETE_CLIENT_START,
    payload: clientId,
});

export const deleteClientSuccess = (clientId) => ({
    type: types.DELETE_CLIENT_SUCCESS,
    payload: clientId,
});

export const deleteClientError = (error) => ({
    type: types.DELETE_CLIENT_ERROR,
    payload: error,
});
