import { ADD_USER, UPDATE_PASSWORD, LOGIN_USER, LOGOUT } from '../Constants/Contants';
const initialstate = [];


export default function addUser(state = initialstate, action) {
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                { userData: action.payload },
            ]
        
        case UPDATE_PASSWORD: {
            let newState = state.filter((items) => {
                if (items.userData.userData.Email !== action.changeUser.Email)
                    return items;
            }
            );
            return [
                ...newState,
                {
                    userData: action.changeUser
                }
            ]
        }
            
        case LOGIN_USER: {
            let newState = state.filter((items) => {
                if (items.userData.userData.Email !== action.currentUser.userData.userData.Email)
                    return items;
            }
            );
            return [
                ...newState,
                {
                    userData: action.currentUser.userData
                }
            ]
        }

        case LOGOUT: {
            console.log(state);
            let newState = state.filter((items) => {
                items.userData.userData.isSelected = false;
                return items;
            }
            );
            return [
                ...newState,
            ]
        }
        
        default:
            return state;
    }
}; 