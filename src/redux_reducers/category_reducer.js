import { combineReducers } from 'redux'


const FINAL_CATEGORY_ACTIONS = {
    FETCH_ALL_CATEGORY_SUCCESS: 'FETCH_ALL_CATEGORY_SUCCESS', 
}
const defaultState = {}


const categoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FINAL_CATEGORY_ACTIONS.FETCH_ALL_CATEGORY_SUCCESS:
            return action.payload && Object.keys(action.payload).length === 0 ? defaultState : Object.assign({}, state, action.payload);
        default:
            return state
    }
}

export default combineReducers({
    categoryInfo: categoryReducer
})