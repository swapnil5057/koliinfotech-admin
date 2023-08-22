import * as types from "../ActionTypes/OurClientsActionTypes";

const initialState = {
    client: [],
    singleClient: [],
    isLoading: false,
    isSuccess: false,
};

const OurClientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_OUR_CLIENT_START:
        case types.LOAD_CLIENTS_START:
        case types.DELETE_CLIENT_START:
        case types.UPDATE_CLIENTS_START:
        case types.GET_SINGLE_CLIENTS_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        case types.LOAD_CLIENTS_SUCCESS:
            return {
                ...state,
                client: action.payload,
                isLoading: false,
                isSuccess: false,
            };

        case types.ADD_OUR_CLIENT_SUCCESS:
        case types.DELETE_CLIENT_SUCCESS:
        case types.UPDATE_CLIENTS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isLoading: false
            };
        case types.GET_SINGLE_CLIENTS_SUCCESS:
            return {
                ...state,
                singleClient: action.payload,
            };
        case types.LOAD_CLIENTS_ERROR:
        case types.GET_SINGLE_CLIENTS_ERROR:
        case types.ADD_OUR_CLIENT_ERROR:
        case types.DELETE_CLIENT_ERROR:
        case types.UPDATE_CLIENTS_ERROR:
        default:
            return state;
    }
};

export default OurClientsReducer;
