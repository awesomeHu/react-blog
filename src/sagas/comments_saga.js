import { take, put, call } from 'redux-saga/effects'
import { get, post, update, remove } from '../api.js'
import { COMMENTS_ACTIONS as ACTIONS } from '../redux_actions/comments_actions'

function* getAllComments(blog_id) {
    return yield call(get, `/comments/${blog_id}`)
}

export function* getAllCommentsFlow() {
    while (true) {
        const action = yield take(ACTIONS.GET_ALL_COMMENTS_REQUEST)
        const res = yield call(getAllComments, action.payload)
        if (res && res.data && res.data.code === 0) {
            yield put({ type: ACTIONS.GET_ALL_COMMENTS_SUCCESS, payload: res && res.data && res.data.data })
        }
    }
}

function* postComment(blog_id, comment_info) {
    return yield call(post, `/comments/${blog_id}`, comment_info)
}

export function* postCommentFlow() {
    while (true) {
        const action = yield take(ACTIONS.POST_NEW_COMMENT_REQUEST)
        const res = yield call(postComment, action.payload.blog_id, action.payload.new_comment)
        if (res && res.data && res.data.code === 0) {
            yield put({ type: ACTIONS.POST_NEW_COMMENT_SUCCESS, payload: res && res.data && res.data.data })
        }
    }
}