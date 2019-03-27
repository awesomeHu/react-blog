import { connect } from 'react-redux';
import { PublishNewBlog } from '../components/administration';
import { addNewBlog, updateBlog } from '../redux_actions/blogs_actions';
import { fetchAllCategories } from '../redux_actions/category_actions'

const mapStateToProps = (state, ownProps) => {
    console.log('is add done ', state.blogState.newBlogInfo.isAddDone)
    console.log('is publish done ', state.blogState.newBlogInfo.isPublished)
    return {
        allCategories: state.categoryState.categoryInfo,
        allBlogs: state.blogState.blogListInfo,
        newBlog: state.blogState.newBlogInfo
    }
}

const mapDispatchToProps = {
    fetchAllCategories,
    addNewBlog,
    updateBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishNewBlog)
