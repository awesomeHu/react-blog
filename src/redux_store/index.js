import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import commentState from '../redux_reducers/comments_reducer'
import categoryState from '../redux_reducers/category_reducer'
import blogState from '../redux_reducers/blog_reducer'
import usersState from '../redux_reducers/user_reducer'
import rootSaga from '../sagas/index.js'

const appReducer = combineReducers({
    commentState,
    categoryState,
    blogState,
    usersState
})

//Create saga middleware
const sagaMiddleware = createSagaMiddleware();
 export const store = createStore(appReducer, applyMiddleware(sagaMiddleware))

 sagaMiddleware.run(rootSaga)

