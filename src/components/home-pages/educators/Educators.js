import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { auth, db } from '../../../config/fbConfig'
import Navbar from '../Navbar'
import Teacher from './Teacher'
import AddEducator from './AddEducator'

class Educators extends Component{
    constructor(props) {
        super(props)
        
        this.state = {
            contactModal: false,

            educators: this.props.educators
        }
    }


    componentDidMount(){
        db.collection("users").doc(auth.currentUser.uid).collection("educators").get()
          .then(snapshot =>{
                snapshot.docs.map(doc =>{
                    this.setState({
                        educators: [...this.state.educators, doc.data()]
                    })
                    
                })
              
          })
    }

    addEducator = (educator)=>{ 
        const {uid} = auth.currentUser

        db.collection("users").doc(uid).collection("educators").add(educator)
          .then(docRef =>{
              educator.authId = docRef.id;
              const educatorList = [educator, ...this.state.educators]
              this.setState({
                  educators: educatorList
              })

              db.collection("users").doc(uid).collection("educators")
                .doc(educator.authId).update({authId: educator.authId})
          })   
    }

    deleteEducator = (id) =>{
        const newEducators = this.state.educators.filter(educator =>{
            return educator.authId !== id;
        })

        this.setState({
            educators: newEducators
        })

        db.collection("users").doc(auth.currentUser.uid).collection("educators").doc(id).delete()
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
                    <div className="col m2 l1 home-nav hide-on-small-only"><Navbar /></div>
                    <div className="col s12 m8 l10">
                        <h2 className="page-heading">Educators</h2>
                        <AddEducator addEducator={this.addEducator}/>
                        <Teacher 
                          educators={this.state.educators} 
                          deleteEducator={this.deleteEducator}
                          contactModal={this.state.contactModal}
                          onOpenModal={this.onOpenModal}
                          onCloseModal={this.onCloseModal} />
                    </div>
                </div>
                <Button floating large className="home-btn">
                    <Link to="/home/welcome"><Icon>home</Icon></Link>
                </Button>
            </div>
        )
    }
}

export default Educators