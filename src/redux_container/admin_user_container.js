import { connect } from 'react-redux';
import { get_all_users } from '../redux_actions/user_actions'
import { UserManagement } from '../components/administration'

const mapStateToProps = (state) => ({
    users: state.usersState.userInfo
})

const mapDispatchToProps = {
    get_all_users
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)