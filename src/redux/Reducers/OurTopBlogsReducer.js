import * as types from '../ActionTypes/OurTopBlogsActionTypes';

const initialState = {
    OurTopBlogs: [],
    SingleBlog: [],
    isLoading: false,
    isSuccess: false,
}

const OurTopBlogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_OUR_BLOG_START:
        case types.GET_SINGLE_BLOG_START:
        case types.ADD_OUR_BLOG_START:
        case types.UPDATE_OUR_BLOG_START:
        case types.DELETE_OUR_BLOG_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        case types.LOAD_OUR_BLOG_SUCCESS:
            return {
                ...state,
                OurTopBlogs: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.GET_SINGLE_BLOG_SUCCESS:
            return {
                ...state,
                SingleBlog: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.UPDATE_OUR_BLOG_SUCCESS:
        case types.ADD_OUR_BLOG_SUCCESS:
        case types.DELETE_OUR_BLOG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        case types.LOAD_OUR_BLOG_ERROR:
        case types.GET_SINGLE_BLOG_ERROR:
        case types.ADD_OUR_BLOG_ERROR:
        case types.UPDATE_OUR_BLOG_ERROR:
        case types.DELETE_OUR_BLOG_ERROR:
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

export default OurTopBlogsReducer;