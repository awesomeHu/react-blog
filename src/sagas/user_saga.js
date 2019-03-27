import { take, put, call, takeEvery, fork } from 'redux-saga/effects';
import { get, post, update, remove } from '../api.js'
import { USER_ACTIONS as ACTIONS } from '../redux_actions/user_actions'

//fetch all users
function* fetchAllUsers() {
    return yield call(get, '/users')
}
export function* fetchAllUsersFlow() {
    while (true) {
        yield take(ACTIONS.GET_ALL_USERS)
        const res = yield call(fetchAllUsers)
        if (res && res.data && res.data.code === 0) yield put({ type: 'FETCH_USERS_SUCCEDED', payload: res && res.data && res.data.data })
    }
}


//signup
function* signup(new_user_info) {
    return yield call(post, '/signup', new_user_info)
}

export function* signupFlow() {
    while (true) {
        const action = yield take(ACTIONS.SIGNUP_REQUEST)
        const res = yield call(signup, action.payload)
        if (res && res.data && res.data.code === 0) {
            yield put({ type: 'FETCH_USERS_SUCCEDED', payload: res && res.data && res.data.data })
        }
    }
}


//login
function* login(user_info) {
    try {
        return yield call(post, '/login', user_info)
    } catch (err) {
        yield put({ type: ACTIONS.LOGIN_FAILURE, msg: '* Email or password is wrong!' })
    }
}

export function* loginFlow() {
    while (true) {
        const action = yield take(ACTIONS.LOGIN_REQUEST)
        const res = yield call(login, action.payload)
        if (res && res.data && res.data.code === 0) {
            yield put({
                type: ACTIONS.LOGIN_SUCCESS,
                payload: res && res.data && res.data.data,
                msg: 'Login successfully!'
            })
            localStorage.setItem('user', JSON.stringify(res.data && res.data.data))
        }
    }
}