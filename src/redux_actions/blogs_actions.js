export const BLOG_ACTIONS = {
    GET_ALL_BLOGS_REQUEST: 'GET_ALL_BLOGS_REQUEST',
    GET_ALL_BLOGS_SUCCESS: 'GET_ALL_BLOGS_SUCCESS',
    GET_ALL_BLOGS_FAILURE: 'GET_ALL_BLOGS_FAILURE',

    GET_BLOG_DETAIL_REQUEST: 'GET_BLOG_DETAIL_REQUEST',
    GET_BLOG_DETAIL_SUCCESS: 'GET_BLOG_DETAIL_SUCCESS',
    GET_BLOG_DETAIL_FAILURE: 'GET_BLOG_DETAIL_FAILURE',

    PUBLISH_NEW_BLOG_REQUEST: 'PUBLISH_NEW_BLOG_REQUEST',
    PUBLISH_NEW_BLOG_SUCCESS: 'PUBLISH_NEW_BLOG_SUCCESS',
    PUBLISH_NEW_BLOG_FAILURE: 'PUBLISH_NEW_BLOG_FAILURE',

    UPDATE_BLOG_REQUEST: 'UPDATE_BLOG_REQUEST',
    UPDATE_BLOG_SUCCESS: 'UPDATE_BLOG_SUCCESS',
    UPDATE_BLOG_FAILURE: 'UPDATE_BLOG_FAILURE',

    LIKE_BLOG_REQUEST: 'LIKE_BLOG_REQUEST',
    LIKE_BLOG_SUCCESS: 'LIKE_BLOG_SUCCESS',
    DELETE_BLOG_REQUEST: 'DELETE_BLOG_REQUEST',
}

export const getAllBlogs = (params) => {
    return {
        type: BLOG_ACTIONS.GET_ALL_BLOGS_REQUEST,
        payload: params
    }
}

export const addNewBlog = (new_blog_info) => {
    return {
        type: BLOG_ACTIONS.PUBLISH_NEW_BLOG_REQUEST,
        payload: new_blog_info
    }
}
export const getBlogDetail = (blog_id) => ({
    type: BLOG_ACTIONS.GET_BLOG_DETAIL_REQUEST,
    payload: blog_id
})

export const updateBlog = (data) => ({
    type: BLOG_ACTIONS.UPDATE_BLOG_REQUEST,
    payload: data
})

export const deleteBlog = (blog_id) => ({
    type: BLOG_ACTIONS.DELETE_BLOG_REQUEST,
    payload: blog_id
})

export const LikeBlog = (user_id, blog_id) => ({
    type: BLOG_ACTIONS.LIKE_BLOG_REQUEST,
    payload: { user_id, blog_id }
})