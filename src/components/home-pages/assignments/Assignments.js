import React, { Component } from 'react'
import { auth, db } from '../../../config/fbConfig'
import Navbar from '../Navbar'
import AddAssignment from './AddAssignment'
import Work from './Work'

class Assignments extends Component{
    constructor(props) {
        super(props)

        this.state = {
            assignments: this.props.assignments
        }
    }

    componentDidMount(){
        db.collection("users").doc(auth.currentUser.uid).collection("assignment").get()
          .then(snapshot =>{
                snapshot.docs.map(doc =>{
                    this.setState({
                        assignments: [...this.state.assignments, doc.data()]
                    })
                    
                })
              
          })
    }

    addAssignment = (assignment)=>{
        console.log(assignment);
        
        const {uid} = auth.currentUser
        db.collection("users").doc(uid).collection("assignment").add(assignment)
          .then(docRef =>{
              assignment.id = docRef.id;
              console.log(assignment.id);

              const assnmntList = [assignment, ...this.state.assignments]
              this.setState({
                  assignments: assnmntList
              })
          })
    }

    render() {        
        return (
            <div className="assignment home">
                <div className="row">
                    <div className="col s1 home-nav"><Navbar /></div>
                    <div className="col s9">
                    <div>
                        <h2 className="page-heading">Assignments</h2>
                            <AddAssignment addAssignment={this.addAssignment}/>
                            <Work assignments={this.state.assignments}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Assignments