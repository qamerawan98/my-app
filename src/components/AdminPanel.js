import React, {Component} from 'react';
import {connect} from 'react-redux'
import Dashboard from './Dashboard'
import UserHome from './UserHome'
import { db, auth } from '../config/fbConfig'
import { Redirect } from 'react-router-dom'
import {signOut} from '../store/actions/authActions'

class AdminPanel extends Component{
    state = {
        users:[{
        email: '',
        password: '',
        phone: '',
        name: '',
        role: '',
        id: ''
        }]
    }
    userList = null; 
    componentDidMount(){
        db.collection('users')
        .get()
        .then( snapshot => {
            const idd = []
            const users = []
            snapshot.forEach(doc => {
                const data = doc.data()
                users.push(data)
                idd.push(doc.id)
            })
            
            this.setState({ users: users})
            let items = [...this.state.users];
            for(var i=0;i<users.length;i++){
                let item = items[i];
                item.id = idd[i];
                items[i] = item;
            }
            this.setState({ items })
            console.log(snapshot)
        })
        .catch( error => console.log(error))
    }

    render(){
        const { auth } = this.props;
        if(!auth.uid){
            return <Redirect to='/' />
        }
        else if(auth.uid=='pfZBTaE7kUbdhxSo5Z6iaHIX4X02'){
            return(
                <div className="admin panel"> 
                    <Dashboard email={auth.email} users={this.state.users} prop={this.props}/>
                </div>
            )
        }
        else{
            return(
                <div className="admin panel"> 
                    <UserHome email={auth.email} users={this.state.users} prop={this.props}/>
                </div>
            )
        }
        console.log(auth);
        
    }
} 

const mapStateToProps = (state) =>{
    console.log(state);
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
      signOut: () => dispatch(signOut())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(AdminPanel)