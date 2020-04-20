// NEVER USED. WILL UPDATE FOR FUTURE USE

import React, { Component } from 'react'
import Navbar from '../Navbar'

class Classroom extends Component{
    state = {
        display:(
            <div>
                <h2 className="page-heading">Classroom</h2>
            </div>
        )
    }
    render() {
        return (
            <div className="classroom home">
                <div className="row">
                    <div className="col s1 home-nav"><Navbar /></div>
                    <div className="col s9">
                        {this.state.display}
                    </div>
                </div>
            </div>
        )
    }
}

export default Classroom