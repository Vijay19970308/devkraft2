import { connect } from 'react-redux';
import SignUp from '../SignUp';
import { SignUpAction } from '../Services/Actions/Action';
const mapStateToProps = (state) => ({
  userList: state.addUser,
})
const mapDispatchToProps = dispatch => ({
  submit: data => dispatch(SignUpAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);