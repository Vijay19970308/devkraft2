import { connect } from 'react-redux';
import Login from '../Login';
import { loginAction } from '../Services/Actions/Action';
const mapStateToProps = state => ({
  userList: state.addUser,
})
const mapDispatchToProps = dispatch => ({
  loginAccount: data => dispatch(loginAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);