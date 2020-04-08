import React, { Component } from 'react'

class SignUp extends Component{
    render() {
        return (
            <div className="sign-up container grey lighten-2 z-depth-1">
                <div className="sign-up-heading center">
                    <h3>Sign Up</h3>
                    <p>Please sign up for a free account!</p>
                </div>
                
                <form className="sign-up-form">
                    <div className="row">
                        <div className="col s6 sign-up-form-item">
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" id="first-name"></input>
                        </div>
                        <div className="col s6 sign-up-form-item">
                            <label htmlFor="first-name">Last Name</label>
                            <input type="text" id="first-name"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 sign-up-form-item">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 sign-up-form-item">
                            <label htmlFor="new-psswrd">Password</label>
                            <input type="password" id="new-psswrd"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 sign-up-form-item">
                            <label htmlFor="new-password-confirm">Confirm Password</label>
                            <input type="email" id="new-password-confirm"></input>
                        </div>
                    </div>
                    <div className="center submit-button">
                        <button className="waves-effect waves-light btn-large light-blue darken-2">Sign Up!</button>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignUp