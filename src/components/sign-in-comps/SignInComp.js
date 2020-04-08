import React, { Component } from 'react'
import Login from './LoginForm'
import SignUp from './SignUpForm'
import SignInLayout from './SignInLayout'
import About from '../other/About'
import './sign-in.css'

class SignInComp extends Component{
    render(){
        return(
            <div className="sign-in-head">
                <Login />
                <SignInLayout />
                <SignUp />                
                <About />
            </div>
        )
    }
}

export default SignInComp