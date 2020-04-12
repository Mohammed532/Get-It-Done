import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Educators from './educators/Educators'
import Assignments from './assignments/Assignments'
import User from './user/UserInfo' 
import './home.css'
import Welcome from './Welcome'

class Home extends Component{
    state = {
        
    }

    componentDidMount(){
        let path = this.props.parentPath;
        this.props.history.push(`${path}/welcome`);
    }

    render() {
        let parentPath = this.props.parentPath;
        
        return (
            <div>
            <Route path={`/home/welcome`} component={Welcome} />
            <Route path="/home/educators" render={(props) =><Educators {...props} educators={this.props.educators} />} />
            <Route path="/home/assignments" render={(props) =><Assignments {...props} assignments={this.props.assignments} />} />
            <Route path="/home/profile" component={User} />
            </div>
        )
    }
}

export default Home