import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import SignInComp from './components/sign-in-comps/SignInComp'
import Home from './components/home-pages/Home'
import Assignments from './components/home-pages/assignments/Assignments'
import Classroom from './components/home-pages/classroom/Classroom'
import Educators from './components/home-pages/educators/Educators'
import User from './components/home-pages/user/UserInfo'
import Footer from './components/other/Footer'

class App extends Component{
    state = {

    }

    render(){
        return(
            <BrowserRouter>
            <div id='app'>
                <Route exact path="/" component={SignInComp} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/home/assignments" component={Assignments} />
                <Route exact path="/home/classroom" component={Classroom} />
                <Route exact path="/home/educators" component={Educators} />
                <Route exact path="/home/profile" component={User} />
                <Footer />
            </div>
            </BrowserRouter>
        );
    }

}

// back to coding does it work?

export default App;
