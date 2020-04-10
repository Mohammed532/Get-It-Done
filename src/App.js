import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { auth } from './config/fbConfig';
import SignInComp from './components/sign-in-comps/SignInComp'
import Home from './components/home-pages/Home'
import Assignments from './components/home-pages/assignments/Assignments'
import Classroom from './components/home-pages/classroom/Classroom'
import Educators from './components/home-pages/educators/Educators'
import User from './components/home-pages/user/UserInfo'
import Footer from './components/other/Footer'


class App extends Component{
    constructor(props){
        super(props);
        console.log(props);
        
        this.state = {
            user: null,
            redirect: null,
            needUpdate: true
        }
    
    }
    

    componentDidMount(){
        this.authListener()
        
    }

    authListener = () =>{
        auth.onAuthStateChanged((user) =>{
            this.setState({needUpdate: true})
            if(user){
                console.log("User is logged in");
                this.setState({
                    user,
                    redirect: "/home"
                })
            }else{
                console.log("User is logged out");
                this.setState({
                    user: null,
                    redirect: "/sign-up"
                })
            }
        }) 
        
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
                <Route path="/sign-up"><SignInComp /></Route>
                <Route path="/home"><Home /></Route>
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
