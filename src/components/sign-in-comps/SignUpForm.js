import React, { Component } from 'react'
import { TextInput, Icon } from 'react-materialize'
import { auth } from '../../config/fbConfig';


class SignUp extends Component{
    state = {
        passwordMatch: true,
        firstNameEmpty: false,
        lastNameEmpty: false,

        firstName: "",
        lastName: "",
        email: "",
        psswrd: "",
        psswrdConfirm: "",
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault();
        let {firstName, lastName, email, psswrd, psswrdConfirm} = {...this.state};

        if(psswrd !== psswrdConfirm){
            this.setState({passwordMatch: false})
            
        }else if(firstName === "" || lastName === ""){
            if(firstName === ""){
                this.setState({firstNameEmpty: true})
            }

            if(lastName === ""){
                this.setState({lastNameEmpty: true})
            }
        }else{
            this.setState({
                passwordMatch: true,
                firstNameEmpty: false,
                lastNameEmpty: false
            })

            auth.createUserWithEmailAndPassword(email, psswrd)
              .then((user) =>{
                console.log("User Signed Up!");
                console.log(user);
                
                this.props.getDisplayName(firstName, lastName)
                
              })
              .catch((err) =>{
                if(err.code === 'auth/email-already-in-use'){
                    alert("You already have an account. Please login")
                    
                }else{
                    console.log(err.code);
                }
              })   
        }   
    }

    render() {
        const {passwordMatch, firstNameEmpty, lastNameEmpty} = this.state;
        return (
            <div className="sign-up">
            <div className="sign-up container grey lighten-2 z-depth-1">
                <div className="sign-up-heading center">
                    <h3>Sign Up</h3>
                    <p>Sign up for a free account!</p>
                </div>
                
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <TextInput
                          className={`${firstNameEmpty ? "invalid" : ""}`}
                          onChange={this.handleChange}
                          name="firstName"
                          id="firstName"
                          label="First Name"
                          s={12}
                          m={12}
                          l={6}
                        />
                        <TextInput
                          className={`${lastNameEmpty ? "invalid" : ""}`}
                          onChange={this.handleChange}
                          name="lastName"
                          id="lastName"
                          label="Last Name"
                          s={12}
                          m={12}
                          l={6}
                        />
                    </div>
                    <div className="row">
                        <TextInput 
                          className=""
                          onChange={this.handleChange}
                          name="email"
                          id="sign-up-email"
                          type="email"
                          label="Email"
                          placeholder="example@email.com"
                          validate
                          s={12}
                        />
                    </div>
                    <div className="row">
                        <TextInput 
                          className={`${passwordMatch ? "" : "invalid"}`}
                          onChange={this.handleChange}
                          name="psswrd"
                          id="sign-up-psswrd"
                          type="password"
                          label="Password"
                          s={12}
                        />
                    </div>
                    <div className="row">
                        <TextInput 
                          className={`${passwordMatch ? "" : "invalid"}`}
                          onChange={this.handleChange}
                          name="psswrdConfirm"
                          id="sign-up-psswrdConfirm"
                          type="password"
                          label="Confirm Password"
                          s={12}
                        />
                    </div>
                    <div className="center submit-button">
                        <button className="waves-effect waves-light btn-large light-blue darken-2">Sign Up!</button>
                    </div>
                    
                </form>
            </div>
            </div>
        )
    }
}

export default SignUp