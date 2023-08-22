import * as types from '../ActionTypes/OurTopBlogsActionTypes';
// ------------------------------------------------------------------
export const loadOurTopBlogsStart = () => ({
    type: types.LOAD_OUR_BLOG_START,
});

export const loadOurTopBlogsSuccess = (blog) => ({
    type: types.LOAD_OUR_BLOG_SUCCESS,
    payload: blog,
});

export const loadOurTopBlogsError = (error) => ({
    type: types.LOAD_OUR_BLOG_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const getSingleBlogStart = (singleBlog) => ({
    type: types.GET_SINGLE_BLOG_START,
    payload: singleBlog,
});

export const getSingleBlogSuccess = (singleBlog) => ({
    type: types.GET_SINGLE_BLOG_SUCCESS,
    payload: singleBlog,
});

export const getSingleBlogError = (error) => ({
    type: types.GET_SINGLE_BLOG_ERROR,
    payload: error,
})
// // ------------------------------------------------------------------
export const addOurBlogStart = (newBlog) => ({
    type: types.ADD_OUR_BLOG_START,
    payload: newBlog,
});

export const addOurBlogSuccess = (newBlog) => ({
    type: types.ADD_OUR_BLOG_SUCCESS,
    payload: newBlog,
});

export const addOurBlogError = (error) => ({
    type: types.ADD_OUR_BLOG_ERROR,
    payload: error,
});
// // ------------------------------------------------------------------
export const deleteOurBlogStart = (deleteOurBlog) => ({
    type: types.DELETE_OUR_BLOG_START,
    payload: deleteOurBlog,
});

export const deleteOurBlogSuccess = (deleteOurBlog) => ({
    type: types.DELETE_OUR_BLOG_SUCCESS,
    payload: deleteOurBlog,
});

export const deleteOurBlogError = (error) => ({
    type: types.DELETE_OUR_BLOG_ERROR,
    payload: error,
});
// // ------------------------------------------------------------------

export const updateOurBlogStart = (updateOurBlog) => ({
    type: types.UPDATE_OUR_BLOG_START,
    payload: updateOurBlog,
});

export const updateOurBlogSuccess = (updateOurBlog) => ({
    type: types.UPDATE_OUR_BLOG_SUCCESS,
    payload: updateOurBlog,
});

export const updateOurBlogError = (error) => ({
    type: types.UPDATE_OUR_BLOG_ERROR,
    payload: error,
});
