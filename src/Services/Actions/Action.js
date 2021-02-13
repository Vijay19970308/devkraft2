import { ADD_USER, UPDATE_PASSWORD, LOGIN_USER, LOGOUT } from '../Constants/Contants';

export const SignUpAction = (userData) => ({
     type: ADD_USER,
     payload: { userData }
})

export const loginAction = (data) => {

     return {
          type: LOGIN_USER,
          currentUser: data
     }
}

export const changePasswordAction = (data) => {

     return {
          type: UPDATE_PASSWORD,
          changeUser: data
     }
}

export const logOutAction = () => {

     return {
          type: LOGOUT
     }
}