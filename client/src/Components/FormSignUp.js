import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class FormSignUp extends Component {

    constructor(props){
        super(props)

        this.state = {
            last_name: "",
            first_name: "",
            email: "",
            password: "",
            error: ["", "", "", ""],
            redirect: false
        }

    }

    // Trying to sign up with provided informations from form.
    createUser = async () => {

        // Verifying fields
        this.state.error = ["", "", "", ""]

        if(this.state.last_name === ""){
            this.state.error[0] = "Ce champ est vide."
        }
        if(this.state.first_name === ""){
            this.state.error[1] = "Ce champ est vide."
        }
        if(this.state.email === ""){
            this.state.error[2] = "Ce champ est vide."
        }
        else if(!(this.state.email.includes("@gmail.com") || this.state.email.includes("@hotmail.fr") || this.state.email.includes("@sfr.fr"))){
            this.state.error[2] = "Cette addresse e-mail n'est pas supporté"
        }
        if(this.state.password === ""){
            this.state.error[3] = "Ce champ est vide."
        }

        this.forceUpdate()

        if(this.state.error[0] === "" && this.state.error[1] === "" && this.state.error[2] === "" && this.state.error[3] === "" ){
            // Informations provided are well-formated
            // Using signUp API
            await axios.post(
                '/api/createUser',
                this.state,
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then( (res) => {
                if(res.data.message === "User added"){
                    // User signed up, ordering a redirect
                    this.setState({redirect: true})
                }
                else if(res.data.message === "Email already exists") {
                    this.state.error[2] = "This email address is already in use."
                    this.forceUpdate()
                }
            })
            .catch( (error) => {
                console.log("Could not create account : " + error)
            })
        }else{
            console.log("Unable to sign up. Data is not correctly formatted.")
        }

    }

    printFormSignUp = () => {
        if (this.props.printFormSignUp === true)
        {
            return(
            <div>
                { // if a redirect is required, not rendering this component. 
                this.state.redirect ? <Redirect to='/signin'/> : null
                }
                <div style={styles.formulaire}>
                    <button onClick={this.props.toggleSignUp} style={styles.cross}>X</button>
                    <label style={styles.legend}><span style={styles.number}>1</span> Identity</label>
                    <br/>
                    <br/>
                    <input type="text" placeholder="Name" style={styles.textArea} value={this.state.last_name} onChange = {(event) => {this.setState({last_name: event.target.value})}}/>
                    {this.state.error[0] !== "" ?  (<div style={{color: 'red'}}>{this.state.error[0]}<br /></div>) : (<br />)}
                    <br/>
                    <input type="text" placeholder="First name" style={styles.textArea} value={this.state.first_name} onChange = {(event) => {this.setState({first_name: event.target.value})}}/>
                    {this.state.error[1] !== "" ?  (<div style={{color: 'red'}}>{this.state.error[1]}<br /></div>) : (<br />)}
                    <br/>
                    <br/>
                    <label style={styles.legend}><span style={styles.number}>2</span> Account informations</label>
                    <br/>
                    <br/>
                    <input type="text" placeholder="Email" style={styles.textArea} value={this.state.email} onChange = {(event) => {this.setState({email: event.target.value})}}/>
                    {this.state.error[2] !== "" ?  (<div style={{color: 'red'}}>{this.state.error[2]}<br /></div>) : (<br />)}
                    <br/>
                    <br/>
                    <input type="password" placeholder="Password" style={styles.textArea} value={this.state.password} onChange = {(event) => {this.setState({password: event.target.value})}}/>
                    {this.state.error[3] !== "" ?  (<div style={{color: 'red'}}>{this.state.error[3]}<br /></div>) : (<br />)}
                    <br/>< br/>
                    <button onClick={this.createUser} style={styles.submitButton}>Send</button>
                </div>
            </div>)
      }else{
          return(<div></div>)
      }
    }

    render()
    {
        return(
            <this.printFormSignUp/>
        );
    }
}

const styles = {

    formulaire: {
        width: 400,
        left: '50%',
        top: '50%',
        position: 'absolute',
        zIndex: 2,
    	padding: 20,
    	backgroundColor: '#f4f7f8',
    	margin: 10,
    	borderRadius: 8,
    	fontFamily: "Georgia",
        transform: "translate(-50%, -50%)"
    },

    number:{
        background: '#1abc9c',
    	color: '#FFF',
    	height: 30,
    	width: 30,
    	display: 'inline-block',
    	fontSize: 18,
    	lineHeight: 1.2,
    	textAlign: 'center',
    	textShadow: 'rgba(255,255,255,0.2)',
    	borderRadius: 15,
    },

    legend:{
        fontSize: 20,
        color: '#1abc9c',
    },

    textArea: {
        fontFamily: "Georgia",
    	background: "rgba(255,255,255,.1)",
    	border: "none",
    	borderRadius: 4,
    	fontSize: 12,
    	margin: 0,
    	outline: 0,
    	padding: 10,
    	width: '100%',
    	boxSizing: 'border-box',
    	WebkitBoxSizing: 'border-box',
    	MozBoxSizing: 'border-box',
    	backgroundColor: '#e8eeef',
    	color: '#8a97a0',
    	WebkitBoxShadow: "rgba(0,0,0,0.03)",
        boxShadow: "rgba(0,0,0,0.03)",
        marginBottom: 5
    },

    submitButton: {
        position: 'relative',
	    display: 'block',
	    padding: '19px 39px 18px 39px',
        color: '#FFF',
        margin: 'auto',
        background: '#1abc9c',
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'normal',
        width: '100%',
        border: '1px solid #16a085',
        borderWidth: '1px 1px 3px',
        marginBottom: 10
    },

    cross: {
        position: 'absolute',
        top: 5,
        right: 5,
        border: "none",
        backgroundColor: '#f4f7f8',
    }

    }
