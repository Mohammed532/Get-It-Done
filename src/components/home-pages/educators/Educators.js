import React, { Component } from 'react'
import Navbar from '../Navbar'

class Educators extends Component{
    state = {
        display:(
            <div>
                <h2 className="page-heading">Educators</h2>
            </div>
        )
    }
    render() {
        return (
            <div className="educators home">
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

export default Educators