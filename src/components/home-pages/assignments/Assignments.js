import React, { Component } from 'react'
import { Button, Icon, TextInput, Divider } from 'react-materialize'
import { Modal } from 'react-responsive-modal'
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
            modalOpen: false,
            assignments: [],
            needsToBeUpdate: {},
            assignmentToUpdate: {},
            updatedAssignment: {},
            updateValue: []
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

    onOpenModal = () => {
        this.setState({ modalOpen: true });
    };
    
    onCloseModal = () => {
        this.setState({ modalOpen: false });
    };

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

        db.collection("users").doc(auth.currentUser.uid)
        .collection("assignments").doc(id).delete()
    }

    editAssignment = (id) =>{ 
        let updateAssignment = this.state.assignments.find(assignment => assignment.authId === id);
        
        // Formats date to be valid for input value
        if(updateAssignment.dueDate !== ""){
            updateAssignment.dueDate = new Date(updateAssignment.dueDate).toISOString().substring(0, 10)
        }

        this.setState({
            updatedAssignment: updateAssignment
        })        
        
        this.onOpenModal()
    }

    handleEditChange = (e) =>{
        console.log(this.state.assignments);

        let newAssignmentObj = this.state.updatedAssignment;
        newAssignmentObj[e.target.name] = e.target.value 

        this.setState({
            updatedAssignment: newAssignmentObj 
        })
    }

    handleEditSubmit = (e) =>{
        e.preventDefault();
    }

    render() {
        const { modalOpen, updatedAssignment } = this.state;       
        return (
            <div className="assignment home">
                <div className="row">
                    <div className="col m2 l1 home-nav hide-on-small-only"><Navbar /></div>
                    <div className="col s12 m9 l10">
                    <div>
                        <h2 className="page-heading">Assignments </h2>
                            <AddAssignment addAssignment={this.addAssignment}/>
                            <Work 
                              assignments={this.state.assignments} 
                              deleteAssignment={this.deleteAssignment}
                              editAssignment={this.editAssignment}
                              />
                        </div>
                    </div>
                </div>
                {/* Button will only show on small screens (like phones) */}
                <Button floating large className="home-btn"><Link to="/home/welcome"><Icon>home</Icon></Link></Button>
                
                <Modal open={modalOpen} onClose={this.onCloseModal} center blockScroll={true} closeOnOverlayClick={false}>
                    <form className="add-assignment-form" onSubmit={this.handleEditSubmit}>
                        <h3>Update Assignment</h3>
                        <Divider />
                        <TextInput
                            className=""
                            name="title"
                            label="Assignment"
                            defaultValue={updatedAssignment.title}
                            onChange={this.handleEditChange}
                            />
                        <div className="row">
                        <TextInput 
                            m={12}
                            l={6}
                            className=""
                            name="subject"
                            label="Subject"
                            value={updatedAssignment.subject}
                            onChange={this.handleEditChange}
                            />
                        <TextInput 
                            m={12}
                            l={6}
                            className=""
                            name="teacher"
                            label="Teacher"
                            value={updatedAssignment.teacher}
                            onChange={this.handleEditChange}
                        />
                        </div>
                        <TextInput 
                            name="description"
                            label="Short Description"
                            value={updatedAssignment.description}
                            onChange={this.handleEditChange}
                        />
                        <TextInput
                            name="dueDate"
                            label="Due Date"
                            type="date"
                            value={updatedAssignment.dueDate}
                            onChange={this.handleEditChange}
                        />
                        <TextInput 
                            name="url"
                            label="Link to website document"
                            type="url"
                            value={updatedAssignment.url}
                            onChange={this.handleEditChange}
                        />
                        <Button type="submit" modal="close">Submit</Button>
                    </form>

                </Modal>
            </div>
        )
    }
}

export default Assignments