
export const COMMENTS_ACTIONS = {
    GET_ALL_COMMENTS_REQUEST: 'GET_ALL_COMMENTS_REQUEST',
    GET_ALL_COMMENTS_SUCCESS: 'GET_ALL_COMMENTS_SUCCESS',
    GET_ALL_COMMENTS_FAILURE: 'GET_ALL_COMMENTS_FAILURE',

    POST_NEW_COMMENT_REQUEST: 'POST_NEW_COMMENT_REQUEST',
    POST_NEW_COMMENT_SUCCESS: 'POST_NEW_COMMENT_SUCCESS',
    POST_NEW_COMMENT_FAILURE: 'POST_NEW_COMMENT_FAILURE',
    DELETE_COMMENT: 'DELETE_COMMENT'

}

export const getAllComments = (blog_id) => ({
    type: COMMENTS_ACTIONS.GET_ALL_COMMENTS_REQUEST,
    payload: blog_id
})

export const postComment = (blog_id, new_comment) => ({
    type: COMMENTS_ACTIONS.POST_NEW_COMMENT_REQUEST,
    payload: { blog_id, new_comment }
})

