import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import Educators from './educators/Educators'
import './home.css'
import Welcome from './Welcome'

class Home extends Component{
    state = {
        display: (
            <div>
                <h2 className="page-heading">Welcome!</h2>
                <h4>Lets get started!</h4>
                <div className="row">
                    <div className="home-item col m12 l6">
                        <div className="card blue darken-2">
                            <div className="card-content white-text">
                                <span className="card-title">Add Assignment</span>
                                <p>Add assignment to keep track of all the work you need to do.</p>
                            </div>
                            <div className="card-action">
                                <a href="/home/assignments">Go to Assignments</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="home-item col m12 l6">
                        <div className="card blue darken-2">
                            <div className="card-content white-text">
                                <span className="card-title">Add Educator</span>
                                <p>Add an Educator and their contact information</p>
                            </div>
                            <div className="card-action">
                                <a href="/home/educators">Go to Educator</a>
                            </div>
                        </div>
                    </div>
                    <div className="home-item col m12 l6">
                        <div className="card blue darken-2">
                            <div className="card-content white-text">
                                <span className="card-title">Add a Class</span>
                                <p>Add a class that will hold all of your work and teacher information for a specific subject</p>
                            </div>
                            <div className="card-action">
                                <a href="/home/classroom">Go to Classroom</a>
                            </div>
                        </div>
                    </div>
                    <div className="home-item col m12 l6">
                        <div className="card blue darken-2">
                            <div className="card-content white-text">
                                <span className="card-title">Edit Profile</span>
                                <p>Have some information you forgot to add? Go ahead and do it here!</p>
                            </div>
                            <div className="card-action">
                                <a href="/home/profile">Go to Profile</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    }


    render() {
        return (
            <div>
            <Welcome />
            </div>
        )
    }
}

export default Home