import React, { Component } from 'react'
import { Row, Col, TextInput, Button, Icon } from 'react-materialize'
import { auth } from '../../config/fbConfig';


class Login extends Component{
    state = {
        displayError: false,
        displayErrorMssg: "",
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
            if(err.code === 'auth/user-not-found'){
                this.setState({
                    displayError: true,
                    displayErrorMssg: "You don't have an account. Please sign up!"
                })
                
            }else if(err.code === 'auth/wrong-password'){
                this.setState({
                    displayError: true,
                    displayErrorMssg: "You have entered the wrong password. Please try again"
                })
            }else{
                console.log(err.code);
            }
          })

    }

    clearAlert = () =>{
        this.setState({
            displayError: false
        })
    }

    render() {
        return (
            <div className="login">
            <div className={`materialert error ${this.state.displayError ? "" : "hide"}`}>
                <Icon>error_outline</Icon>
                {this.state.displayErrorMssg}
                <button 
                    type="button" 
                    className="close-alert"
                    onClick={this.clearAlert}>×
                </button>
            </div>
            <div className="z-depth-2 grey darken-3">
                <Row className="valign-wrapper">
                    <Col 
                      m={4}
                      className="hide-on-small-only">
                        <h4 className="inline white-text">Login</h4>
                    </Col>
                    <Col
                      s={12}
                      m={6}>
                        <form className="valign-wrapper" onSubmit={this.handleSubmit}>
                            <Row className="valign-wrapper">
                            <TextInput 
                              className="login-input white-text"
                              type="email"
                              id="email"
                              placeholder="Email"
                              onChange={this.handleChange}
                              s={6}
                              m={5}
                            />
                            <TextInput
                              className="login-input white-text"
                              type="password"
                              id="psswrd"
                              placeholder="Password"
                              onChange={this.handleChange}
                              s={6}
                              m={5}
                            />
                            <Button
                              className="grey lighten-2 black-text"
                              small
                              onClick={this.handleSubmit}>
                                Login
                            </Button>
                            </Row>
                        </form>
                      </Col>
                    {/* <button className="btn-small grey lighten-2 black-text login-btn" onClick={this.handleSubmit}>Login</button> */}
                </Row>
            </div>
            </div>
        )
    }
}

export default Login