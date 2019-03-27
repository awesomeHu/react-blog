

import { combineReducers } from 'redux';
import { COMMENTS_ACTIONS as ACTIONS } from '../redux_actions/comments_actions';


const defaultState = {
    is_fetching: true,
    comment_list: [],
    is_post_done: false
}

function commentReducer(state = defaultState, action) {
    switch (action.type) {
        case ACTIONS.GET_ALL_COMMENTS_SUCCESS:
            return {
                ...state,
                is_fetching: false,
                comment_list: action.payload.list
            }
        case ACTIONS.GET_ALL_COMMENTS_FAILURE:
            return {}
        case ACTIONS.POST_NEW_COMMENT_SUCCESS:
           state.comment_list.push(action.payload)
            return { 
                ...state,
                is_post_done: true,
                comment_list: state.comment_list
            }
        case ACTIONS.POST_NEW_COMMENT_FAILURE:
            return {
                ...state
            }
        default:
            return state
    }
}


export default combineReducers({
    commentsInfo: commentReducer
})