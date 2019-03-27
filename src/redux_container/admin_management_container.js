import { connect } from 'react-redux';
import { BlogManagement } from '../components/administration';
import { getAllBlogs, deleteBlog, updateBlog } from '../redux_actions/blogs_actions';
import { fetchAllCategories } from '../redux_actions/category_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        allBlogs: state.blogState.blogListInfo,
    }
}

const mapDispatchToProps = {
    getAllBlogs,
    deleteBlog,
    fetchAllCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogManagement)
