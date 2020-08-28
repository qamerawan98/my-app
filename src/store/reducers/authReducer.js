const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login Failed');
            return{
                ...state,
                authError: 'Login Failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return{
                ...state,
                authError: null
            }
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return{
                authError: null
        }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return{
                ...state,
                authError: action.err.message
        }
        case 'UPDATE_SUCCESS':
            console.log('update success');
            return{
                authError: null
        }
        case 'UPDATE_ERROR':
            console.log('update error');
            return{
                ...state,
                authError: action.err.message
        }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;   
        default:
            return state;    
    }
}


export default authReducer