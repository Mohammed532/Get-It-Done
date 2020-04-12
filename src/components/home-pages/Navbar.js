import React from 'react'
import { auth } from '../../config/fbConfig'
import { Link } from 'react-router-dom'
import { Icon } from 'react-materialize'
import bookIcon from '../../res/transparent-book.png'
import gradCapIcon from '../../res/transparent-graduation-hat.png'
// import doorIcon from '../../res/transparent-doors-black-4.png'

const Navbar = () =>{

    function handleLogout(){
        auth.signOut() 
    }

    return(
        <div className="z-depth-2 navbar">
            <div className="account center">
               <Link to="/home/profile"><i className=" large material-icons white-text" title="Profile">person_outline</i></Link> 
            </div>
            <ul className="side-nav center">
                <li><Link to="/home/assignments"><img src={bookIcon} width='60px' height='60px' title="Assignments" alt="Assignments"></img></Link></li>
                <li><Link to="/home/educators"><img src={gradCapIcon} width='60px' height='60px' title="Educators" alt="Educators"></img></Link></li>
                <li onClick={handleLogout}><Icon className="black-text" large>exit_to_app</Icon></li>
                {/* <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li> */}
            </ul>
        </div>
    )
}

export default Navbar