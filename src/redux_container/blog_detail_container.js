import { connect } from 'react-redux';
import { postComment } from '../redux_actions/comments_actions'
import BlogPage from '../components/blog_page';
import { getBlogDetail, LikeBlog } from '../redux_actions/blogs_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        blog_comments: state.commentState.commentsInfo,
        allCategories: state.categoryState.categoryInfo, 
        blogDetail: state.blogState.blogDetail
    }
}


const mapDispatchToProps = {
    postComment,
    getBlogDetail,
    LikeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)
