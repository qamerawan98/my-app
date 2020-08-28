import React from 'react';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AdminPanel from './components/AdminPanel'
import UserData from './components/UserData'
import CreateUser from './components/CreateUser'
import { BrowserRouter, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={ SignIn } />
        <Route path='/signup' component={ SignUp } />
        <Route path='/create' component={ CreateUser } />
        <Route path='/dashboard' component={ AdminPanel } />
        <Route path='/userdetail/:userId' component={ UserData } />
      </div>
    </BrowserRouter>
  );
}

export default App;
