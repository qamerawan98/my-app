export const signIn = (credentials) =>{
    return(dispatch,getState,{getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=>{
            dispatch({ type:'LOGIN_SUCCESS'});
        }).catch((err)=>{
            dispatch({type:'LOGIN_ERROR',err});
        });
    }
}

export const signOut = () =>{
    return(dispatch,getState,{getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(()=>{
            dispatch({ type:'SIGNOUT_SUCCESS'});
        });
    }
}

export const editPermission = (user) =>{
    return(dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(user.id).update({
            create: user.create,
            update: user.update,
            delete: user.delete
        }).then(()=>{
            dispatch({ type:'UPDATE_SUCCESS'});
        }).catch(err=>{
            dispatch({type:'UPDATE_ERROR',err})
        })
    }
}

export const signUp = (newUser) =>{
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response)=>{
            return firestore.collection('users').doc(response.user.uid).set({
                email: newUser.email,
                password: newUser.password,
                phone: newUser.phone,
                name: newUser.name,
                role: 'user',
                create: 'false',
                update: 'false',
                delete: 'false'
            })
        }).then(()=>{
            dispatch({type:'SIGNUP_SUCCESS'})
        }).catch(err=>{
            dispatch({type:'SIGNUP_ERROR',err})
        })
    }
}
