
import { combineReducers } from 'redux'
import { BLOG_ACTIONS } from '../redux_actions/blogs_actions'

const initialstate = {
    isFetching: false,
    //for main page
    blogList: {},

    // for recent post
    allBlogList: [],

    //for blog detail
    blogDetail: {},
    total: 0,
    msg: ''
}


//Fetch all blogs
const blogListReducer = (state = initialstate, action) => {
    switch (action.type) {
        case BLOG_ACTIONS.GET_ALL_BLOGS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case BLOG_ACTIONS.GET_ALL_BLOGS_SUCCESS:
            const { blogList, allBlogList, blogDetail, total } = action.payload
            return {
                ...state,
                isFetching: false,
                blogList,
                allBlogList,
                blogDetail,
                total
            };
        case BLOG_ACTIONS.GET_ALL_BLOGS_FAILURE:
            return {
                msg: 'Network Request Error!',
                isFetching: true
            }
        default:
            return state
    }
}

//Blog detail

const iniState = {
    isFetching: true,
    blog_title: '',
    blog_content: '',
    category: [],
    num_of_likes: 0,
    views: 0,
    blog_comments: [],
    author: 'Admin',
    create_time: '',
    like_users: [],
}

const blogDetailReducer = (state = iniState, action) => {
    switch (action.type) {
        case BLOG_ACTIONS.GET_BLOG_DETAIL_SUCCESS:
            const { blog_content, blog_title, category, create_time, blog_comments, like_users, meta } = action.payload
            const { likes, views } = meta
            return {
                ...state,
                isFetching: false,
                blog_title,
                blog_content,
                category,
                num_of_likes: likes,
                views,
                blog_comments,
                create_time,
                like_users,

            }
        case BLOG_ACTIONS.GET_BLOG_DETAIL_FAILURE:
            return {
                ...state,
                isFetching: true
            }
        case BLOG_ACTIONS.LIKE_BLOG_SUCCESS:
            const user = JSON.parse(localStorage.getItem('user'))
            state.like_users.push(user)
            return {
                ...state,
                num_of_likes: state.num_of_likes + 1,
                like_users: state.like_users
            }
        default:
            return state
    }
}




const defaultState = {
    isAddDone: false,
    blog_title: '',
    blog_content: '',
    category: [],
    isPublished: false,
}

//add and update blog reducer
const newBlogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case BLOG_ACTIONS.PUBLISH_NEW_BLOG_SUCCESS:
            const { blog_title, blog_content, category } = action.payload
            return {
                ...state,
                blog_title,
                blog_content,
                category,
                isAddDone: true
            }
        case BLOG_ACTIONS.PUBLISH_NEW_BLOG_FAILURE:
            return { ...state, isAddDone: false }
        case BLOG_ACTIONS.UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                blog_title: action.payload.blog_title,
                blog_content: action.payload.blog_content,
                category: action.payload.category,
                isPublished: true
            }
        case BLOG_ACTIONS.UPDATE_BLOG_FAILURE:
            return { ...state, isPublished: false }
        default:
            return state
    }
}


export default combineReducers({
    blogListInfo: blogListReducer,
    newBlogInfo: newBlogReducer,
    blogDetail: blogDetailReducer
})