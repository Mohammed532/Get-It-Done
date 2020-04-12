import React from 'react'
import { Card } from 'react-materialize'
import 'react-responsive-modal/styles.css'
// import { Modal } from 'react-responsive-modal'

const Teacher = ({educators, deleteEducator, contactModal, onOpenModal, onCloseModal}) =>{
    let teacherList = educators.length ? (
        educators.map(teacher =>{
            return(
                <div key={teacher.authId}>
                <Card
                  actions={[
                    //   <h6 id={teacher.id} onClick={onOpenModal}>See contact info</h6>
                    <i className="contact">{teacher.email}</i>,
                    <i className="contact">{teacher.phone}</i>,
                    <span className="right delete white-text" onClick={()=>{deleteEducator(teacher.authId)}}>Delete</span>
                  ]}
                  className="grey darken-2"
                  textClassName="white-text grey darken-1"
                  title={teacher.name}
                >
                    <p>{`Class: ${teacher.class}`}</p>
                </Card>
                
                </div>
            )
            
        })
    ) : (<h6>You have no teachers</h6>) 
    
    
    

    return(
        <div className="teacher">
            {teacherList}
            {/* <Modal open={contactModal} onClose={onCloseModal}>
                <h3>Contact Information</h3>
                <p><i>{`Email: `}</i></p>
                <p><i>{`Phone: `}</i></p>

            </Modal> */}
        </div>
    )
}

export default Teacher