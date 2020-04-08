import React from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Button, Icon, TextInput } from 'react-materialize'

var isModalOpen = false;
const AddAssignment = ({addAssignment}) =>{
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) =>{
        addAssignment(data)
        // let modal = Modal.getInstance("assignmentFormModal");
        console.log(Modal);
        
        isModalOpen = false;
        
    }

    return (
        <h3>
        <span>Add Assignment</span>
        <Modal
            id="assignmentFormModal"
            header="All of the fields don't need to be filled in to submit"
            open={isModalOpen}
            actions={[
            <Button modal="close" node="button" waves="green">Close</Button>
            ]}
            trigger={<Button 
                className="light-blue darken-3"
                floating
                icon={<Icon>add</Icon>}
                large
                node="button"
                waves="light"
            />}>
            <form className="add-assignment-form" onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    ref={register({required: true})}
                    name="title"
                    placeholder="Assignment"
                />
                <div className="row">
                <TextInput 
                    ref={register({required: true})}
                    className="col s6"
                    name="subject"
                    placeholder="Subject"
                />
                <TextInput 
                    ref={register({required: true})}
                    className="col s6"
                    name="teacher"
                    placeholder="Teacher"
                />
                </div>
                <TextInput 
                    ref={register}
                    name="description"
                    placeholder="Short Description"
                />
                <TextInput
                    ref={register}
                    name="dueDate"
                    label="Due Date"
                    type="date"
                />
                <TextInput
                    ref={register}
                    name="link"
                    placeholder="Link to file (saves file)"
                    label="File"
                    type="file"
                />
                <TextInput 
                    ref={register}
                    name="url"
                    label="Link to website document"
                    type="url"
                />
                <Button type="submit" modal="close">Submit</Button>
            </form>

        </Modal>
        </h3>
        // <div className="add-assignment">
        //     <h3><span>Add Assignment</span><span> <a className="btn-floating btn-large waves-effect waves-light light-blue darken-3"><i className="material-icons">add</i></a></span></h3>
        // </div>
    )
}

export default AddAssignment