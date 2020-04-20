import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { auth } from '../../config/fbConfig';
import Navbar from './Navbar'

const Welcome = () =>{    
    return(
        <div className="home">
            <div className="row content">
                <div className="col m2 l1 home-nav hide-on-small-only"><Navbar /></div>
                <div className="col s12 m8 l10">
                    <div>
                        <h2 className="page-heading">Welcome {auth.currentUser ? auth.currentUser.displayName : ""}!</h2>
                        <h4>Lets get started!</h4>
                        <div className="row">
                            <div className="home-item col s12 m12 l6">
                                <div className="card blue darken-2">
                                    <div className="card-content white-text">
                                        <span className="card-title">Add Assignment</span>
                                        <p>Add assignment to keep track of all the work you need to do.</p>
                                    </div>
                                    <div className="card-action">
                                        <Link to="/home/assignments">Go to Assignments</Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="home-item col s12 m12 l6">
                                <div className="card blue darken-2">
                                    <div className="card-content white-text">
                                        <span className="card-title">Add Educator</span>
                                        <p>Add an Educator and their contact information</p>
                                    </div>
                                    <div className="card-action">
                                        <Link to="/home/educators">Go to Educator</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="home-item col s12 m12 l6">
                                <div className="card blue darken-2">
                                    <div className="card-content white-text">
                                        <span className="card-title">Edit Profile</span>
                                        <p>Have some information you forgot to add? Go ahead and do it here!</p>
                                    </div>
                                    <div className="card-action">
                                        <Link to="/home/profile">Go to Profile</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button 
              floating 
              large 
              className="home-btn red"
              onClick={()=>{auth.signOut()}}>
                <Icon>exit_to_app</Icon>
            </Button>
        </div>
    )
}

export default Welcome