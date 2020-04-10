import React, { Component } from 'react'
import { auth, db } from '../../config/fbConfig';
import { TextInput } from 'react-materialize'

class SignUp extends Component{
    state = {
        passwordMatch: true,
        firstName: "",
        lastName: "",
        email: "",
        psswrd: "",
        psswrdConfirm: "",
    }

    handleChange = e =>{
        console.log(e.target.name, e.target.value);
        
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault();
        let {firstName, lastName, email, psswrd, psswrdConfirm} = {...this.state};

        if(psswrd !== psswrdConfirm){
            this.setState({passwordMatch: false})
            
        }else{
            this.setState({passwordMatch: true})

            auth.createUserWithEmailAndPassword(email, psswrd)
              .then((user) =>{
                console.log("User Signed Up!");
                console.log(user);
                
                this.props.getDisplayName(firstName, lastName)
                
              })
              .catch((err) =>{
                console.error("There was a problem........", err);
              })
            
        }


        
    }

    render() {
        const {passwordMatch} = this.state;
        return (
            <div className="sign-up container grey lighten-2 z-depth-1">
                <div className="sign-up-heading center">
                    <h3>Sign Up</h3>
                    <p>Sign up for a free account!</p>
                </div>
                
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <TextInput
                          className=""
                          onChange={this.handleChange}
                          name="firstName"
                          label="First Name"
                          m={12}
                          l={6}
                        />
                        <TextInput
                          className=""
                          onChange={this.handleChange}
                          name="lastName"
                          label="Last Name"
                          m={12}
                          l={6}
                        />
                    </div>
                    <div className="row">
                        <TextInput 
                          className=""
                          onChange={this.handleChange}
                          name="email"
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
        )
    }
}

export default SignUp