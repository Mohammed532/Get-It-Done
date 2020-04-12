import React, { Component } from 'react'
import { Button, Icon, TextInput, Dropdown, Divider, Row, Col } from 'react-materialize'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';

class AddEducators extends Component{
    state = {
        modalOpen: false,
        nameIsEmpty: false,
        emailIsEmpty: false,

        title: "Mr.",
        name: "",
        class: "",
        email: "",
        phone: "",
    }

    onOpenModal = () => {
        this.setState({ modalOpen: true });
    };
    
    onCloseModal = () => {
        this.setState({ modalOpen: false });
    };

    onDropDownChange = (e) =>{
        this.setState({
            title: e.target.innerHTML
        })
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //safely removes element from state (doesn't mutate the actual state)
    removeElement = (obj, el) =>{
        let {[el]: omit, ...res} = obj
        return res
    }

    handleSubmit = e =>{
        e.preventDefault();

        if(this.state.name !== "" && this.state.email !== ""){
            
            this.setState({
                nameIsEmpty: false,
                emailIsEmpty: false,

                title: "Mr.",
                name: "",
                class: "",
                email: "",
                phone: "",
            })

            let info = this.removeElement(this.state, "modalOpen");
            info = this.removeElement(info, "nameIsEmpty");
            info = this.removeElement(info, "emailIsEmpty");
            info.name = `${info.title} ${info.name}`
            info = this.removeElement(info, "title");

            this.props.addEducator(info)

            this.onCloseModal()
        }else{
            if(this.state.name === ""){
                // alert("Please put the teacher's name");
                this.setState({
                    nameIsEmpty: true
                })
            }
            
            if(this.state.email === ""){
                this.setState({
                    emailIsEmpty: true
                })
            }
        }
        
        
    }

    render() {
        const { modalOpen, nameIsEmpty, emailIsEmpty } = this.state;
        return (
            <div className="add-educator">
               <h3>
                   <span className="add-form-heading">Add Educator</span>
                   <Button 
                        className="light-blue darken-3"
                        floating
                        icon={<Icon>add</Icon>}
                        large
                        node="button"
                        waves="light"
                        onClick={this.onOpenModal}
                    />

                    <Modal open={modalOpen} onClose={this.onCloseModal} center blockScroll={true} closeOnOverlayClick={true}>
                        <form className="add-assignment-form" onSubmit={this.handleSubmit}>
                            <h3>Please fill out this form</h3>
                            <i>(Teacher's name and email is mandatory)</i>
                            <Row>
                                <Col s={4}>
                                    <Dropdown
                                      trigger={<h5 className="title-drop-down">{this.state.title} </h5>}>
                                        <span className="flow-text" onClick={this.onDropDownChange}>Mr.</span>
                                        <Divider />
                                        <span className="flow-text" onClick={this.onDropDownChange}>Mrs.</span>
                                        <Divider />
                                        <span className="flow-text" onClick={this.onDropDownChange}>Miss</span>
                                        <Divider />
                                        <span className="flow-text" onClick={this.onDropDownChange}>Proffesor</span>
                                    </Dropdown>
                                </Col>
                                <Col s={8}>
                                    <TextInput 
                                      className={`${nameIsEmpty ? 'invalid' : ''}`}
                                      placeholder="Name"
                                      name="name"
                                      onChange={this.handleChange}
                                    />
                                </Col>
                            </Row>
                            <TextInput 
                              placeholder="Class"
                              name="class"
                              onChange={this.handleChange}
                            />
                            <TextInput
                              className={`${emailIsEmpty ? 'invalid' : ''}`}
                              placeholder="Email"
                              type="email"
                              name="email"
                              onChange={this.handleChange}
                              validate
                            />
                            <TextInput
                              placeholder="Phone Number"
                              type="tel"
                              name="phone"
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

export default AddEducators