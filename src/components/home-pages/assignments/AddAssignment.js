import React, { Component } from 'react'
import { Button, Icon, TextInput } from 'react-materialize'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';

class AddAssignment extends Component{
    state = {
        modalOpen: false,
        titleIsEmpty: false,
        subjectIsEmpty: false,
        teacherIsEmpty: false,

        title: "",
        subject: "",
        teacher: "",
        description: "",
        dueDate: "",
        file: "",
        url: ""
        
    }

    onOpenModal = () => {
        this.setState({ modalOpen: true });
    };
    
    onCloseModal = () => {
        this.setState({ modalOpen: false });
    };

    handleChange = e =>{
        if(e.target.name === "dueDate"){
            const d = new Date(e.target.value);
            
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let year = d.getFullYear();

            this.setState({
                dueDate: `${month}/${day}/${year}`
            })
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    //safely removes element from state (doesn't mutate the actual state)
    removeElement = (obj, el) =>{
        let {[el]: omit, ...res} = obj
        return res
    }

    handleSubmit = e =>{
        e.preventDefault();

        if(this.state.title !== "" && this.state.subject !== "" && this.state.teacher !== ""){
            this.setState({
                titleIsEmpty: false,
                subjectIsEmpty: false,
                teacherIsEmpty: false,

                title: "",
                subject: "",
                teacher: "",
                description: "",
                dueDate: "",
                file: "",
                url: ""
            })

            let info = this.removeElement(this.state, "modalOpen");
            info = this.removeElement(info, "titleIsEmpty");
            info = this.removeElement(info, "subjectIsEmpty");
            info = this.removeElement(info, "teacherIsEmpty");

            this.props.addAssignment(info)

            this.onCloseModal()
        }else{
            if(this.state.title === ""){
                this.setState({
                    titleIsEmpty: true
                })
            }
            
            if(this.state.subject === ""){
                this.setState({
                    subjectIsEmpty: true
                })
            }
            
            if(this.state.teacher === ""){
                this.setState({
                    teacherIsEmpty: true
                })
            }
        }    
    }

    render() {
        const { modalOpen, titleIsEmpty, subjectIsEmpty, teacherIsEmpty } = this.state;
        return (
            <div className="add-assignment">
               <h3>
                   <span className="add-form-heading">Add Assignment</span>
                   <Button 
                        className="light-blue darken-3"
                        floating
                        icon={<Icon>add</Icon>}
                        large
                        node="button"
                        waves="light"
                        onClick={this.onOpenModal}
                    />

                    <Modal open={modalOpen} onClose={this.onCloseModal} center blockScroll={true} closeOnOverlayClick={false}>
                        <form className="add-assignment-form" onSubmit={this.handleSubmit}>
                            <h3>Please fill out this form</h3>
                            <i>(Assignment name, subject, and teacher is mandatory)</i>
                            <TextInput
                                className={`${titleIsEmpty ? 'invalid':''}`}
                                name="title"
                                placeholder="Assignment"
                                onChange={this.handleChange}
                                />
                            <div className="row">
                            <TextInput 
                                className={`col s6 ${subjectIsEmpty ? 'invalid':''}`}
                                name="subject"
                                placeholder="Subject"
                                onChange={this.handleChange}
                                />
                            <TextInput 
                                className={`col s6 ${teacherIsEmpty ? 'invalid':''}`}
                                name="teacher"
                                placeholder="Teacher"
                                onChange={this.handleChange}
                            />
                            </div>
                            <TextInput 
                                name="description"
                                placeholder="Short Description"
                                onChange={this.handleChange}
                            />
                            <TextInput
                                name="dueDate"
                                label="Due Date"
                                type="date"
                                onChange={this.handleChange}
                            />
                            {/* Don't have file saving functionality yet */}
                            {/* <TextInput
                                name="file"
                                placeholder="Link to file (saves file)"
                                label="File"
                                type="file"
                                onChange={this.handleChange}
                            /> */}
                            <TextInput 
                                name="url"
                                label="Link to website document"
                                type="url"
                                onChange={this.handleChange}
                            />
                            <Button type="submit" modal="close">Submit</Button>
                        </form>

                    </Modal>
               </h3>
            </div>
        )
    }
}

export default AddAssignment