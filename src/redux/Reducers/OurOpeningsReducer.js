import * as types from '../ActionTypes/OurOpeningsActionTypes';

const initialState = {
    OurOpenings: [],
    SingleOpening: [],
    isLoading: false,
    isSuccess: false,
}

const OurOpeningsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_OUR_OPENING_START:
        case types.GET_SINGLE_OPENING_START:
        case types.ADD_OUR_OPENING_START:
        case types.UPDATE_OUR_OPENING_START:
        case types.DELETE_OUR_OPENING_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        case types.LOAD_OUR_OPENING_SUCCESS:
            return {
                ...state,
                OurOpenings: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.GET_SINGLE_OPENING_SUCCESS:
            return {
                ...state,
                SingleOpening: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.ADD_OUR_OPENING_SUCCESS:
        case types.UPDATE_OUR_OPENING_SUCCESS:
        case types.DELETE_OUR_OPENING_SUCCESS:
            console.log('state~~~~~~~~~update~~>',state)
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case types.LOAD_OUR_OPENING_ERROR:
        case types.GET_SINGLE_OPENING_ERROR:
        case types.ADD_OUR_OPENING_ERROR:
        case types.UPDATE_OUR_OPENING_ERROR:
        case types.DELETE_OUR_OPENING_ERROR:
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

export default OurOpeningsReducer;