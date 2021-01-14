
import React from 'react';
const axios = require('axios');

//var express = require('express');
//var router = express.Router();
//const nodemailer = require("nodemailer");
//var cors = require('cors');

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }

        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSubjectChange = this.onSubjectChange.bind(this);
        this.onMsgChange = this.onMsgChange.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }
    onEmailChange(event) {
        this.setState({email: event.target.value})
    }
    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }
    onMsgChange(event) {
        this.setState({message: event.target.value})
    }

    submitEmail(e) {
        e.preventDefault();
        let data = this.state;
        axios.post('http://localhost:5000/send', data)
            .then( res => {
                this.resetForm()
            })
            .catch( () => {
                console.log('Message not sent')
            })
    }
    

    resetForm() {
        this.setState({
            name: '',
            subject: '',
            message: ''
        });
    }

    

    render() {
        return (
            <div className="container">
            <form id="contact-form" method="POST" onSubmit={this.submitEmail}>
                <div className="form-group">
                    <label>Name</label>
                    <br />
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        required  
                        value={this.state.name} 
                        onChange={this.onNameChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <br />
                    <input 
                        type="email" 
                        placeholder="Enter email"
                        required
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                    <br />
                    <small className="text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Subject</label>
                    <input 
                        type="text" 
                        className="metro-input" 
                        value={this.state.subject}
                        onChange={this.onSubjectChange}
                    />
                </div>
                <div className="form-group">
                    <textarea 
                        data-role="textarea" 
                        data-auto-size="true"
                        required
                        value={this.state.message}
                        onChange={this.onMsgChange}
                        ></textarea>
                </div>
                <button type="submit" className="button dark">Send message</button>
            </form>
            </div>
        )
    }
}





export default Contact;