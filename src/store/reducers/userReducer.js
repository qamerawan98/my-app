const initState = {
    users: [
        { id: '1',email: 'qamerawan98@gmail.com',password:'12345'},
        { id: '2',email: 'qamerawan98@gmail.com',password:'12345'},
        { id: '3',email: 'qamerawan98@gmail.com',password:'12345'}
    ]
}

const userReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_USER':
            console.log(action.user);
            return state;
        case 'CREATE_USER_ERROR':
            console.log('create user error',action.err);
            return state;
        default:
            return state;    

    }
}


export default userReducer