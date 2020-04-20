import React from 'react'
import { Collapsible, Divider } from 'react-materialize'

const Work = ({assignments, deleteAssignment}) =>{
    let assignmentList = assignments.length ? (
        assignments.map(assnmnt =>{
            return(
                <li key={assnmnt.authId}>
                    <div className="collapsible-header">
                        <div className="container">
                            <span className="assignment-header">{assnmnt.title}</span>
                            <span className="assignment-date right">Due Date: {assnmnt.dueDate}</span>
                            
                        </div> 
 
                    </div>
                    <div className="collapsible-body">
                        <h6>Subject: {assnmnt.subject}</h6>
                        <h6>Teacher: {assnmnt.teacher}</h6>
                        <p>{assnmnt.description}</p>
                        <p className="link"><a href={assnmnt.url} target="_blank">{assnmnt.url}</a></p>
                        <Divider />
                        {/* <span className="edit">Edit</span> */} <span className="delete" onClick={()=>{deleteAssignment(assnmnt.authId)}}>Delete</span>
                    </div>
                </li>
            )
            
        })
    ) : (<h6>You have no assignments</h6>) 
    
    
    

    return(
        <div className="assignment">
            <Collapsible accordion popout>
                {assignmentList}
            </Collapsible>
        </div>
    )
}

export default Work