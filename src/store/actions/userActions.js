export const createUser = (user) => {
    return (dispatch, getstate, {getFirebase, getFirestore}) => {
        const fireStore = getFirestore();
        fireStore.collection('users').add({
            ...user
        }).then(()=>{
            dispatch({type: 'CREATE_USER', user});
        }).catch((err)=>{
            dispatch({type: 'CREATE_USER_ERROR',err})
        })
        
    }
};
