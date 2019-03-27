import { take, put, call, takeEvery, fork } from 'redux-saga/effects';
import { get, post, update, remove } from '../api.js'

//fetch categories
function* fetchCategories() {
    return yield call(get, '/categories');
}

export function* fetchCategoriesFlow() {
    while (true) {
        yield take('FETCH_ALL_CATEGORY')
        const data = yield call(fetchCategories)
        yield put({ type: 'FETCH_ALL_CATEGORY_SUCCESS', payload: data && data && data.data.data })
    }
}
//add category
function* addCategory(name) {
    return yield call(post, '/categories', { name });
}

export function* addCategoryFlow() {
    while (true) {
        const req = yield take('ADD_CATEGORY')
        const res = yield call(addCategory, req.payload)
        if (res && res.data && res.data.code === 0) {
            const data = yield call(fetchCategories)
            yield put({ type: 'FETCH_ALL_CATEGORY_SUCCESS', payload: data && data && data.data.data })
        }
    }
}

//remove category
function* removeCategory(category_id) {
    return yield call(remove, `/categories/${category_id}`);
}

export function* removeCategoryFlow() {
    while (true) {
        const req = yield take('DELETE_CATEGORY')
        const res = yield call(removeCategory, req.payload)
        if (res && res.data && res.data.code === 0) {
            const data = yield call(fetchCategories)
            yield put({ type: 'FETCH_ALL_CATEGORY_SUCCESS', payload: (data && data.data && data.data.data) || '' })
        }
    }
}

