import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { auth } from './config/fbConfig';
import SignInComp from './components/sign-in-comps/SignInComp'
import Home from './components/home-pages/Home'
import Footer from './components/other/Footer'

var displayName;
class App extends Component{
    state = {
        assignments: [],
        educators: [],

        newUser: null,
        user: null,
        redirect: null,
        needUpdate: true
    }
    
    componentDidMount(){
        this.authListener()
        
    }

    getDisplayName = (firstName, lastName) =>{
        displayName = `${firstName} ${lastName}`
    }

    authListener = () =>{
        auth.onAuthStateChanged((user) =>{
            this.setState({needUpdate: true})
            if(user){
                user.updateProfile({
                    displayName: displayName
                })

                this.setState({
                    user,
                })
            }else{
                this.setState({
                    user: null,
                })
            }
        }) 
        
    }

    isNewUser = (login) =>{
        this.setState({newUser: login})
    }

    renderHome = () =>{
        let path = `/${this.state.user.uid}/home`
        return(
            <div>
                <Route to={path} render={(props) => 
                    <Home 
                      {...props} 
                      parentPath={path}
                      assignments={this.state.assignments}
                      educators={this.state.educators} />}>
                </Route>
                <Redirect to={`${path}/welcome`} />
            </div>
        );
    }

    renderSignIn = () =>{
        let path = "/sign-in"  
        return(
            <div>
                <Route to={path} render={(props) =>
                    <SignInComp 
                      {...props} 
                      isNewUser={this.isNewUser} 
                      getDisplayName={this.getDisplayName} />}>
                </Route>
                <Redirect to={path} />
            </div>
        );
        
    }


    render(){
        return(
            <BrowserRouter>
            <div id='app'>
                {this.state.user ? (this.renderHome()) : (this.renderSignIn())}
                <Footer />
            </div>
            </BrowserRouter>
        );
    }

}

// back to coding does it work?

export default App;
