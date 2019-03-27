import { take, put, call } from 'redux-saga/effects'
import { get, post, update, remove } from '../api.js'
import { BLOG_ACTIONS as ACTIONS } from '../redux_actions/blogs_actions'

//Get all blogs
function* getAllBlogs() {
    try {
        return yield call(get, '/blogs')
    } catch (err) {
        yield put({ type: ACTIONS.GET_ALL_BLOGS_FAILURE })
    }
}

export function* getAllBlogsFlow() {
    while (true) {
        yield take(ACTIONS.GET_ALL_BLOGS_REQUEST)
        const res = yield call(getAllBlogs)
        if (res && res.data && res.data.code === 0) {
            const { blogList, allBlogList, blogDetail } = handleBlogList(res)
            yield put({ type: ACTIONS.GET_ALL_BLOGS_SUCCESS, payload: { blogList, allBlogList, blogDetail } })
        }
    }
}

function handleBlogList(res) {
    const blogList = {}
    const allBlogList = []
    const categoriesOfBlogs = []
    const blogDetail = {}
    res && res.data && res.data.data.list.map((item, index) => {
        allBlogList.push(item._id)
        if (categoriesOfBlogs.indexOf(item.category[0]) === -1) {
            categoriesOfBlogs.push(item.category[0])
        }
        blogDetail[item._id] = item
    })
    categoriesOfBlogs.map((category, index) => {
        blogList[category] = []
        res && res.data && res.data.data.list.map((blog, index) => {
            if (blog.category[0] === category) {
                blogList[category].push(blog)
            }
        })
    })

    return { blogList, allBlogList, blogDetail }
}


//Add new blog
function* addBlog(info) {
    try {
        return yield call(post, '/blogs', info)
    } catch (err) {
        yield put({ type: ACTIONS.PUBLISH_NEW_BLOG_FAILURE })
    }
}

export function* addBlogFlow() {
    while (true) {
        const action = yield take(ACTIONS.PUBLISH_NEW_BLOG_REQUEST)
        const res = yield call(addBlog, action.payload)
        if (res && res.data && res.data.code === 0) {
            yield put({ type: ACTIONS.PUBLISH_NEW_BLOG_SUCCESS, payload: res.data.data })
            const response = yield call(getAllBlogs)
            if (response && response.data && response.data.code === 0)
                yield put({ type: ACTIONS.GET_ALL_BLOGS_SUCCESS, payload: response && response.data && response.data.data })
        }
    }

}

//Update blog
function* updateBlog(id, data) {
    try {
        return yield call(update, `/blogs/${id}`, data)
    } catch (err) {
        yield put({ type: ACTIONS.UPDATE_BLOG_FAILURE, payload: {}, msg: 'Update Failed!' })
    }
}

export function* updateBlogFlow() {
    while (true) {
        const action = yield take(ACTIONS.UPDATE_BLOG_REQUEST)
        const res = yield call(updateBlog, action.payload.id, action.payload)
        if (res && res.data && res.data.code === 0) {
            yield put({ type: ACTIONS.UPDATE_BLOG_SUCCESS, payload: res.data.data, msg: 'Update succesfully!' })
            const response = yield call(getAllBlogs)
            if (response && response.data && response.data.code === 0) {
                yield put({ type: ACTIONS.GET_ALL_BLOGS_SUCCESS, payload: response && response.data && response.data.data })
            }
        }
    }
}

//Delete blog
function* deleteBlog(id) {
    return yield call(remove, `/blogs/${id}`)
}

export function* deleteBlogFlow() {
    while (true) {
        const action = yield take(ACTIONS.DELETE_BLOG_REQUEST)
        const res = yield call(deleteBlog, action.payload)
        if (res && res.data && res.data.code === 0) {
            const response = yield call(getAllBlogs)
            if (response && response.data && response.data.code === 0) {
                const { blogList, allBlogList, blogDetail } = handleBlogList(response)
                yield put({ type: ACTIONS.GET_ALL_BLOGS_SUCCESS, payload: { blogList, allBlogList, blogDetail } || '' })
            }
        }
    }
}


//Get blog detail
function* getBlogDetail(blog_id) {
    return yield call(get, `/blogs/${blog_id}`)
}

export function* getBlogDetailFlow() {
    while (true) {
        const action = yield take(ACTIONS.GET_BLOG_DETAIL_REQUEST)
        const response = yield call(getBlogDetail, action.payload)
        if (response && response.data && response.data.code === 0) {
            yield put({ type: ACTIONS.GET_BLOG_DETAIL_SUCCESS, payload: response && response.data && response.data.data })
        }
    }
}


//Like blog
function* likeBlog(info) {
    return yield call(post, '/likeBlog', info)
}

export function* likeBlogFlow() {
    while (true) {
        const action = yield take(ACTIONS.LIKE_BLOG_REQUEST)
        const res = yield call(likeBlog, action.payload)
        if (res && res.data && res.data.code === 0) {
            yield put({ type: ACTIONS.LIKE_BLOG_SUCCESS })
        }
    }

}