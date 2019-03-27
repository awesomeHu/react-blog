import { connect } from 'react-redux';
import Blogs from '../components/blogs';
import { getAllBlogs } from '../redux_actions/blogs_actions';
import { fetchAllCategories } from '../redux_actions/category_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        allBlogs: state.blogState.blogListInfo,
        allCategories: state.categoryState.categoryInfo,
    }
}
const mapDispatchToProps = {
    getAllBlogs,
    fetchAllCategories
}


export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
