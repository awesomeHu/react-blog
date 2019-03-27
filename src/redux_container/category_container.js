import { connect } from 'react-redux';
import { fetchAllCategories, removeCategory, addCategory } from '../redux_actions/category_actions'
import { CategoryManagement } from '../components/administration';


const mapStateToProps = (state, ownProps) => {
    return {
        allCategories: state.categoryState.categoryInfo
    }
}

const mapDispatchToProps = {
    fetchAllCategories,
    removeCategory,
    addCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagement)
