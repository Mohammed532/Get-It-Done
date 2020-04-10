import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { auth, db } from './config/fbConfig';
import SignInComp from './components/sign-in-comps/SignInComp'
import Home from './components/home-pages/Home'
import Assignments from './components/home-pages/assignments/Assignments'
import Classroom from './components/home-pages/classroom/Classroom'
import Educators from './components/home-pages/educators/Educators'
import User from './components/home-pages/user/UserInfo'
import Footer from './components/other/Footer'

var displayName;
class App extends Component{
    state = {
        assignments: [],
        teachers: [],

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
                console.log("User is logged in");

                user.updateProfile({
                    displayName: displayName
                })

                db.collection("users").doc(user.uid).get()
                  .then(snapshot =>{
                      if (snapshot.exists){
                          snapshot.collection("assignments").get()
                            .then(snapshot.doc.map(doc =>{console.log(doc.data());}))
                      }else{
                          
                      }
                  })

                this.setState({
                    user,
                })
            }else{
                console.log("User is logged out");
                this.setState({
                    user: null,
                })
            }
        }) 
        
    }

    isNewUser = (login) =>{
        this.setState({newUser: login})
        console.log(login);
        
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
                      teachers={this.state.teachers} />}>
                </Route>
                <Redirect to={`${path}/welcome`} />
            </div>
        );
    }

    renderSignIn = () =>{
        let path = "/sign-in"
        console.log("hit");
        
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
        // console.log(this.state.needUpdate);
        
        // if(this.state.needUpdate === true && this.state.redirect){
        //     this.setState({
        //         needUpdate: false
        //     })

        //     return (
        //         <BrowserRouter>
        //             <Redirect to={this.state.redirect} />
        //         </BrowserRouter>
        //     )
            
        // }
        
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
