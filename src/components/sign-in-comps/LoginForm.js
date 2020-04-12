import React, { Component } from 'react'
import { auth } from '../../config/fbConfig';


class Login extends Component{
    state = {
        email: "",
        psswrd: "",
    }

    handleChange = e =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault();
        let { email, psswrd } = {...this.state};

        auth.signInWithEmailAndPassword(email, psswrd)
          .then(user =>{
            this.props.isNewUser(false);  
          })
          .catch(err =>{
            console.error("Darn", err);
          })

    }

    render() {
        return (
            <div className="login">
            <div className="z-depth-2 grey darken-3">
                <div className="row valign-wrapper">
                    <div className="col m5 hide-on-small-only"><h4 className="inline white-text">Login</h4></div>
                    
                    <div className="col s12 m6">
                        <form className="" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col s6">
                                    <label htmlFor="email" className="white-text login-label">Email </label>
                                    <input 
                                      type="email" 
                                      id="email" 
                                      className="browser-default"
                                      onChange={this.handleChange}></input>
                                </div>

                                <div className="col s6">
                                    <label htmlFor="psswrd" className="white-text login-label">Password </label>
                                    <input 
                                      type="password" 
                                      id="psswrd" 
                                      className="browser-default"
                                      onChange={this.handleChange}></input>
                                </div>
                            </div>
                            
                        </form>
                    </div>

                    <div className="col s3 m1">
                    <button className="btn-small grey lighten-2 black-text" onClick={this.handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Login