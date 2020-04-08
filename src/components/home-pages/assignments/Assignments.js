import React, { Component } from 'react'
import Navbar from '../Navbar'
import AddAssignment from './AddAssignment'
import Work from './Work'

class Assignments extends Component{
    state = {
        assignments: [
            {id:1, title:"Page #169", subject:"Math", teacher:"Mrs. S", description:"do it", dueDate:"4/8/20", link:"", url:""},
            {id:2, title:"Read Hamlet", subject:"Reading", teacher:"Mrs. Price", description:"read it", dueDate:"4/9/20", link:"", url:""},
        ]
    }

    addAssignment = (assignment)=>{
        assignment.id = this.state.assignments.length + 1;
        const assnmntList = [assignment, ...this.state.assignments]
        this.setState({
            assignments: assnmntList
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