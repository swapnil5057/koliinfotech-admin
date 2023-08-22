import * as types from '../ActionTypes/ContactUsActionTypes';

const initialState = {
    contactUsList: [],
    SingleContact: [],
    isLoading: false,
    isSuccess: false,
}

const ContactUsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_CONTACT_US_START:
        case types.DELETE_CONTACT_US_START:
        case types.GET_SINGLE_CONTACT_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        case types.LOAD_CONTACT_US_SUCCESS:
            return {
                ...state,
                contactUsList: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.GET_SINGLE_CONTACT_SUCCESS:
            return {
                ...state,
                SingleContact: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.DELETE_CONTACT_US_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case types.LOAD_CONTACT_US_ERROR:
        case types.DELETE_CONTACT_US_ERROR:
        case types.GET_SINGLE_CONTACT_ERROR:
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

export default ContactUsReducer;