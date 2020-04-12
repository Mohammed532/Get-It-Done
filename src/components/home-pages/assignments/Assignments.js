import React, { Component } from 'react'
import { Button, Icon } from 'react-materialize'
import { auth, db } from '../../../config/fbConfig'
import Navbar from '../Navbar'
import AddAssignment from './AddAssignment'
import Work from './Work'
import homeIcon from '../../../res/chimney-home-icon-transparent-1.png'
import { Link } from 'react-router-dom'


class Assignments extends Component{
    constructor(props) {
        super(props)

        this.state = {
            assignments: this.props.assignments
        }
    }

    componentDidMount(){
        db.collection("users").doc(auth.currentUser.uid).collection("assignments").get()
          .then(snapshot =>{
                snapshot.docs.map(doc =>{
                    this.setState({
                        assignments: [...this.state.assignments, doc.data()]
                    }) 
                })
          })
    }

    addAssignment = (assignment)=>{    
        const {uid} = auth.currentUser
        db.collection("users").doc(uid).collection("assignments").add(assignment)
          .then(docRef =>{
              assignment.authId = docRef.id;

              const assnmntList = [assignment, ...this.state.assignments]
              this.setState({
                  assignments: assnmntList
              })

              db.collection("users").doc(uid).collection("assignments")
                .doc(assignment.authId).update({authId: assignment.authId})
          })
    }

    deleteAssignment = (id) =>{
        const newAssignment = this.state.assignments.filter(assignment =>{
            return assignment.authId !== id;
        })

        this.setState({
            assignments: newAssignment
        })

        db.collection("users").doc(auth.currentUser.uid).collection("assignments").doc(id).delete()
    }

    render() {        
        return (
            <div className="assignment home">
                <div className="row">
                    <div className="col m2 l1 home-nav hide-on-small-only"><Navbar /></div>
                    <div className="col s12 m9 l9">
                    <div>
                        <h2 className="page-heading">Assignments </h2>
                            <AddAssignment addAssignment={this.addAssignment}/>
                            <Work assignments={this.state.assignments} deleteAssignment={this.deleteAssignment}/>
                        </div>
                    </div>
                </div>
                <Button floating large className="home-btn"><Link to="/home/welcome"><Icon>home</Icon></Link></Button>
            </div>
        )
    }
}

export default Assignments