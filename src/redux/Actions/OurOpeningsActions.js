import * as types from '../ActionTypes/OurOpeningsActionTypes';
// ------------------------------------------------------------------
export const loadOurOpeningsStart = () => ({
    type: types.LOAD_OUR_OPENING_START,
});

export const loadOurOpeningsSuccess = (opening) => ({
    type: types.LOAD_OUR_OPENING_SUCCESS,
    payload: opening,
});

export const loadOurOpeningsError = (error) => ({
    type: types.LOAD_OUR_OPENING_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const getSingleOpeningStart = (SingleOpening) => ({
    type: types.GET_SINGLE_OPENING_START,
    payload: SingleOpening,
});

export const getSingleOpeningSuccess = (SingleOpening) => ({
    type: types.GET_SINGLE_OPENING_SUCCESS,
    payload: SingleOpening,
});

export const getSingleOpeningError = (error) => ({
    type: types.GET_SINGLE_OPENING_ERROR,
    payload: error,
})
// // // ------------------------------------------------------------------
export const addOurOpeningsStart = (newOpening) => ({
    type: types.ADD_OUR_OPENING_START,
    payload: newOpening,
});

export const addOurOpeningsSuccess = (newOpening) => ({
    type: types.ADD_OUR_OPENING_SUCCESS,
    payload: newOpening,
});

export const addOurOpeningsError = (error) => ({
    type: types.ADD_OUR_OPENING_ERROR,
    payload: error,
});
// // // ------------------------------------------------------------------
export const deleteOurOpeningstart = (deleteOurOpenings) => ({
    type: types.DELETE_OUR_OPENING_START,
    payload: deleteOurOpenings,
});

export const deleteOurOpeningsuccess = (deleteOurOpenings) => ({
    type: types.DELETE_OUR_OPENING_SUCCESS,
    payload: deleteOurOpenings,
});

export const deleteOurOpeningError = (error) => ({
    type: types.DELETE_OUR_OPENING_ERROR,
    payload: error,
});
// // // ------------------------------------------------------------------

export const updateOurOpeningsStart = (updateOurOpenings) => ({
    type: types.UPDATE_OUR_OPENING_START,
    payload: updateOurOpenings,
});

export const updateOurOpeningsSuccess = (updateOurOpenings) => ({
    type: types.UPDATE_OUR_OPENING_SUCCESS,
    payload: updateOurOpenings,
});

export const updateOurOpeningsError = (error) => ({
    type: types.UPDATE_OUR_OPENING_ERROR,
    payload: error,
});
