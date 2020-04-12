import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collection, CollectionItem, Button, Icon, Col, TextInput } from 'react-materialize'
import { Modal } from 'react-responsive-modal'
import firebase from 'firebase/app'
import { auth, db } from '../../../config/fbConfig';
import Navbar from '../Navbar'

class UserInfo extends Component{
    state = {
        defaultEmail: auth.currentUser.email,
        settingDisplay: null,
        modalOpen: false,
        showError: false,

        emails:[],
        phone: []
    }

    componentDidMount(){
        db.collection("users").doc(auth.currentUser.uid).get()
          .then(doc =>{
              if(!doc.get("emails") || doc.get("emails") === null){
                  this.setState({
                      emails: [this.state.defaultEmail]
                  })

                  db.collection("users").doc(auth.currentUser.uid).set({
                      emails: this.state.emails
                  })     
              }else{
                  this.setState({
                      emails: doc.get("emails")
                  })   
              }

              if(!doc.get("phone") || doc.get("phone") === null){
                  db.collection("users").doc(auth.currentUser.uid).set({
                      phone: []
                  })
              }else{
                  this.setState({
                      phone: doc.get("phone")
                  })
              }
          })
        
    }

    clearAlert = () =>{
        this.setState({
            showError: false
        })
    }

    //Controls whether modal shows or not
    onModalOpen = () =>{this.setState({modalOpen: true})}
    onModalClose = () =>{this.setState({modalOpen: false})}

    //Renders list of emails
    renderEmails = () =>{
        var emailKey = 0;
        const emailList = this.state.emails.length ? (
            this.state.emails.map(email =>{
                emailKey++
                return (
                    <div key={emailKey}>
                    <CollectionItem className="valign-wrapper">
                        <Col s={10} m={11}>
                        <p>{email}</p>
                        </Col>
                        <Col s={2} m={1}>
                        <p className="delete" id={email} onClick={this.deleteEmail}>Delete</p>
                        </Col>
                    </CollectionItem>
                    </div>
                )
            })
        ) : (<p>No emails on file</p>)

        return emailList

    }

    //Creates form to add email to list and database
    addEmail = (e) =>{
        this.setState({
            settingDisplay: (
                <div>
                    <h4>Add Email</h4>
                    <form onSubmit={(e) =>{
                        e.preventDefault();
                        let emailInput = document.getElementById("new-email").value;

                        let newEmailList = [emailInput, ...this.state.emails]
                        this.setState({
                            emails: newEmailList
                        })

                        db.collection("users").doc(auth.currentUser.uid).update({
                            emails: firebase.firestore.FieldValue.arrayUnion(emailInput)
                        })

                        this.onModalClose()
                    }} >
                    <TextInput
                        id="new-email"
                        email
                        label="Email"
                        s={12}
                        validate
                    />
                    <Button>Submit</Button>
                    </form>
                </div>
            )
        })

        this.onModalOpen()
    }

    deleteEmail = (e) =>{
        let targetEmail = e.target.id

        if(targetEmail === this.state.defaultEmail){
            this.setState({
                showError: true
            })
            
        }else{
            const newEmails = this.state.emails.filter(email =>{
                return email !== targetEmail;
            })
    
            this.setState({
                emails: newEmails
            })

            db.collection("users").doc(auth.currentUser.uid).update({
                emails: firebase.firestore.FieldValue.arrayRemove(targetEmail)
            })
        } 
    }


    //Renders list of phone numbers
    renderPhones = () =>{
        var phoneKey = 0;
        const phoneList = this.state.phone.length ? (
            this.state.phone.map(phone =>{
                phoneKey++
                return (
                    <div key={phoneKey}>
                    <CollectionItem className="valign-wrapper">
                        <Col s={10} m={11}>
                        <p>{phone}</p>
                        </Col>
                        <Col s={2} m={1}>
                        <p className="delete" id={phone} onClick={this.deletePhone}>Delete</p>
                        </Col>
                    </CollectionItem>
                    </div>
                )
            })
        ) : (<p>No numbers on file</p>)

        return phoneList
    }

    //Add phone number to the list and to the database
    addPhone = (e) =>{
        this.setState({
            settingDisplay: (
                <div>
                    <h4>Add Phone Number</h4>
                    <form onSubmit={(e) =>{
                        e.preventDefault();
                        let phoneInput = document.getElementById("new-phone").value;

                        let newPhoneList = [phoneInput, ...this.state.phone]
                        this.setState({
                            phone: newPhoneList
                        })

                        db.collection("users").doc(auth.currentUser.uid).update({
                            phone: firebase.firestore.FieldValue.arrayUnion(phoneInput)
                        })

                        this.onModalClose()
                    }} >
                    <TextInput
                        id="new-phone"
                        type="tel"
                        label="Phone Number"
                        s={12}
                    />
                    <Button>Submit</Button>
                    </form>
                </div>
            )
        })

        this.onModalOpen()
    }

    deletePhone = (e) =>{
        let targetPhone = e.target.id

        const newPhone = this.state.phone.filter(phone =>{
            return phone !== targetPhone;
        })

        this.setState({
            phone: newPhone
        })

        db.collection("users").doc(auth.currentUser.uid).update({
            phone: firebase.firestore.FieldValue.arrayRemove(targetPhone)
        })

    }

    render() {
        const { showError } = this.state
        
        return (
            <div className="profile home">
                <div className="row">
                    <div className="col m1 home-nav hide-on-small-only"><Navbar /></div>
                    <div className="col s12 m9">
                        <div>
                            <h2 className="page-heading">{auth.currentUser ? (auth.currentUser.displayName):("")}</h2>
                            <div className={`materialert error ${showError ? "" : "hide"}`}>
                                <Icon>error_outline</Icon>
                                You can't delete that email! That's the one you signed up with!
                                <button 
                                  type="button" 
                                  className="close-alert"
                                  onClick={this.clearAlert}>×</button>
                            </div>
                            <h4>Emails</h4>
                            <Collection>
                                {this.renderEmails()}
                            </Collection>
                            <Button onClick={this.addEmail}>Add Email</Button>

                            <h4>Phone Number</h4>
                            <Collection>
                                {this.renderPhones()}
                            </Collection>
                            <Button onClick={this.addPhone}>Add Phone Number</Button>

                            {/* Will work on this later */}
                            {/* <h4>Other Options</h4>
                            <Button>Change Default Email</Button>
                            <Button>Reset Password</Button> */}

                            {/* Modal for all of the settings */}
                            <Modal open={this.state.modalOpen} onClose={this.onModalClose} center blockScroll={true} >
                                {this.state.settingDisplay}
                            </Modal>
                        </div>
                    </div>
                </div>
                <Button floating large className="home-btn">
                    <Link to="/home/welcome"><Icon>home</Icon></Link>
                </Button>
            </div>
        )
    }
}

export default UserInfo