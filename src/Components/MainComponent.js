import { connect } from 'react-redux';

import Main from '../Main';
const mapStateToProps = state => ({
    userList: state.addUser,
});
export default connect(mapStateToProps)(Main);