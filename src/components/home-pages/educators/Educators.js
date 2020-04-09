import React, { Component } from 'react'
import Navbar from '../Navbar'
import Teacher from './Teacher'
import AddEducator from './AddEducator'

class Educators extends Component{
    state = {
        //Modal for Teacher.js
        contactModal: false,

        educators: [
            {id:1, title:"Mr.", name: "Smith", class: "Japenese", email:"john-smith@pgcps.org", phone:"240-555-5555"},
            {id:2, title:"Mrs.", name: "Price", class: "AP Lit", email:"kerry-price@pgcps.org", phone:"240-123-4567"}
        ]
    }

    // handleClick = e =>{
    //     console.log(e.target.innerHTML);
    //     e.target.innerHTML = 'dick';
        
    // }

    addEducator = (educator)=>{
        educator.id = this.state.educators.length + 1;
        const teacherList = [educator, ...this.state.educators]
        this.setState({
            educators: teacherList
        })
        
    }

    onOpenModal = () =>{
        this.setState({contactModal: true})
    }

    onCloseModal = () =>{
        this.setState({contactModal: false})
    }

    render() {
        return (
            <div className="educators home">
                <div className="row">
                    <div className="col s1 home-nav"><Navbar /></div>
                    <div className="col s9">
                        <h2 className="page-heading">Educators</h2>
                        <AddEducator addEducator={this.addEducator}/>
                        <Teacher 
                          educators={this.state.educators} 
                          contactModal={this.state.contactModal}
                          onOpenModal={this.onOpenModal}
                          onCloseModal={this.onCloseModal} />
                        {/* <div onClick={this.handleClick}>hello</div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Educators