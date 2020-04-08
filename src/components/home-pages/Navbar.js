import React from 'react'
import doorIcon from '../../res/transparent-doors-black-4.png'
import bookIcon from '../../res/transparent-book.png'
import gradCapIcon from '../../res/transparent-graduation-hat.png'

const Navbar = () =>{
    return(
        <div className="z-depth-2 navbar">
            <div className="account center">
               <a href="/home/profile"><i className=" large material-icons white-text" title="Profile">person_outline</i></a> 
            </div>
            <ul className="side-nav center">
                <li><a href="/home/classroom"><img src={doorIcon} width='60px' height='60px' title="Classroom"></img></a></li>
                <li><a href="/home/assignments"><img src={bookIcon} width='60px' height='60px' title="Assignments"></img></a></li>
                <li><a href="/home/educators"><img src={gradCapIcon} width='60px' height='60px' title="Educators"></img></a></li>
                {/* <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li> */}
            </ul>
        </div>
    )
}

export default Navbar