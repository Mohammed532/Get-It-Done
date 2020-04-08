import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Login extends Component{
    state = {
        ussername: "",
        psswrd: "",
    }

    render() {
        return (
            <div className="login z-depth-2 grey darken-3">
                <div className="row valign-wrapper">
                    <div className="col s5"><h4 className="inline white-text">Login</h4></div>
                    
                    <div className="col s6">
                        <form className="">
                            <div className="row">
                                <div className="col s6">
                                    <label htmlFor="usrname" className="white-text login-label">Username </label>
                                    <input type="text" id="usrname" className="browser-default"></input>
                                </div>

                                <div className="col s6">
                                    <label htmlFor="psswrd" className="white-text login-label">Password </label>
                                    <input type="password" id="psswrd" className="browser-default"></input>
                                </div>
                            </div>
                            
                        </form>
                    </div>

                    <div className="col s1">
                        <Link to="/home"><button className="btn-small grey lighten-2 black-text">Login</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login