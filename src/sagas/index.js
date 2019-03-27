import { fork } from 'redux-saga/effects';
import { fetchCategoriesFlow, removeCategoryFlow, addCategoryFlow } from "./category_saga";
import { getAllBlogsFlow, addBlogFlow, deleteBlogFlow, updateBlogFlow, getBlogDetailFlow, likeBlogFlow } from './blog_saga'
import { loginFlow, signupFlow, fetchAllUsersFlow } from './user_saga'
import { getAllCommentsFlow, postCommentFlow } from './comments_saga';

export default function* rootSaga() {
    //category
    yield fork(fetchCategoriesFlow)
    yield fork(addCategoryFlow)
    yield fork(removeCategoryFlow)

    //blog
    yield fork(getAllBlogsFlow)
    yield fork(addBlogFlow)
    yield fork(deleteBlogFlow)
    yield fork(updateBlogFlow)
    yield fork(getBlogDetailFlow)
    yield fork(likeBlogFlow)

    //comment
    yield fork(getAllCommentsFlow)
    yield fork(postCommentFlow)

    //user
    yield fork(fetchAllUsersFlow)
    yield fork(signupFlow)
    yield fork(loginFlow)

}