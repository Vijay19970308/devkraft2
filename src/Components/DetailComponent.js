import { connect } from 'react-redux';
import { changePasswordAction, logOutAction } from '../Services/Actions/Action';
import Details from '../Details';
const mapStateToProps = state => ({
  userList: state.addUser,
})
const mapDispatchToProps = dispatch => ({
  update: data => dispatch(changePasswordAction(data)),
  logout: () => dispatch(logOutAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Details);