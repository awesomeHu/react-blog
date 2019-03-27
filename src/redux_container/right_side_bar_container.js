import { connect } from 'react-redux'
import {fetchAllCategories} from '../redux_actions/category_actions'
import {getAllBlogs} from '../redux_actions/blogs_actions'
import RightSideBar from '../components/right_side_bar'

const mapStateToProps = (state) => {
    return {
        allCategories: state.categoryState.categoryInfo,
        allBlogs: state.blogState.blogListInfo,
    }
}

const mapDispatchToProps = {
    fetchAllCategories,
    getAllBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBar)