import React, { Component } from 'react';
import * as firebase from 'firebase'
import './users.css'
var config = {
    apiKey: "AIzaSyDLC6QdeMl-SKZisjn6Py5up0spvkkwS14",
    authDomain: "onedoc-76a9b.firebaseapp.com",
    databaseURL: "https://onedoc-76a9b.firebaseio.com",
    projectId: "onedoc-76a9b",
    storageBucket: "",
    messagingSenderId: "518763913856"
  };
firebase.initializeApp(config);

class users extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: null,
            pass: null,
            user: null,
        }
    }

    componentDidMount = () => {
        this.authListener();
    }

    signIn = () => {
        const txtEmail = document.getElementById("txtEmail").value;
        const txtPassword = document.getElementById("txtPass").value;
        const auth = firebase.auth();
        //Sign In
        auth.signInWithEmailAndPassword(txtEmail, txtPassword).then(user => {
            //Redirect Page will go here
            this.setState({
                email: txtEmail,
                pass: txtPassword,
            });
            window.alert("Welcome!");
        }).catch(error => {
            //Catching errors
            let errorCode = error.code;
            let errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        })
    }

    signUp = () => {
        const txtEmail = document.getElementById("txtEmail").value;
        const txtPassword = document.getElementById("txtPass").value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.createUserWithEmailAndPassword(txtEmail, txtPassword).then(user => {
            //Redirect Page will go here
            window.alert("Welcome!");
            this.setState({
                email: txtEmail,
                pass: txtPassword,
            });
        });
        promise.catch(e => {
            let errorCode = e.code;
            let errorMessage = e.message;
            window.alert("Error: " + errorMessage);
        });
    }
    
    //Sign Out
    signOut = () => {
        this.setState({
            email: null,
            pass: null,
            user: null,
        });
        firebase.auth().signOut();
    }

    //Real-time Listener
    authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
              this.setState({user});
              console.log(user);
            } else {
                this.setState({user: null});
                console.log('not logged in');
            }
          });
    }
    
	render() {
        let logout = null;
        if(this.state.user != null){
            logout = (
                <button id = "btnLogOut" onClick = {this.signOut}>Log Out</button>
            );
        }
		return (
			<div className="users">
                <div className = "UserForm">
                    <input type = "email" id = "txtEmail" placeholder = "Email"></input> <br/>
                    <input type = "password" id = "txtPass" placeholder = "Password"></input>
                </div>
                <button id = "btnSignIn" onClick = {this.signIn}>Sign in</button>
                <button id = "btnSignUp" onClick = {this.signUp}>Sign Up</button>
                {logout}
			</div>
            
		);
	}
}

export default users;
