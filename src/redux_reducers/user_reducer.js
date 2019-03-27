import { combineReducers } from 'redux'
import { USER_ACTIONS } from '../redux_actions/user_actions'

const USERS_ACTIONS = {
    FETCH_USERS_SUCCEDED: 'FETCH_USERS_SUCCEDED'
}

const defaultState = {}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USERS_ACTIONS.FETCH_USERS_SUCCEDED:
            return Object.keys(action.payload).length === 0 ? defaultState : Object.assign({}, state, action.payload);
        default:
            return state
    }
}


const initialState = { loggedIn: false, user: {}, msg: '' }
const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTIONS.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggedIn: true,
                user: action.payload,
                msg: 'Login successfully!'
            })
        case USER_ACTIONS.LOGIN_FAILURE:
            return Object.assign({}, state, {
                loggedIn: false,
                user: {},
                msg: 'Email or password is wrong!'
            })
        case USER_ACTIONS.LOGOUT:
            return {}
        default:
            return state
    }

}

export default combineReducers({
    userInfo: userReducer,
    loggedInUser: authenticationReducer
})