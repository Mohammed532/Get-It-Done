import React from 'react'
import { Collapsible } from 'react-materialize'

const Work = ({assignments}) =>{
    console.log(assignments);
    let assignmentList = assignments.length ? (
        assignments.map(assnmnt =>{
            return(
                <li key={assnmnt.id}>
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