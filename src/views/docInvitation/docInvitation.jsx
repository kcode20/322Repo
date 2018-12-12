import React from 'react';
import '../docInvitation/docInvitation.css'
//Please include Owner ID and Doc ID as props...
export default class docInvitation extends React.Component{
    constructor(){
        super();
        this.state = {
            documentID: "",
            inputUsername1: "",
            inputUsername2: "",
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = () => {
        //this.props.DocID and this.props.ownerID are needed to proceed...
        console.log("you will be submitting the username below...");
        //Will submit this.props.DocID and this.props.ownerID and inputUsername...
        console.log(this.state.documentID);
        console.log(this.state.inputUsername1);
        console.log(this.state.inputUsername2);

        //Clearing the state, ready for more inputs...
        this.setState({
            documentID:"",
            inputUsername1: "",
            inputUsername2: "",
        })
    }
    render(){
        return(
            <div className = "form">
                <input id = "documentID" type = "text" placeholder="document ID" name = "documentID"
                  value = {this.state.documentID} onChange = {(e) => this.changeHandler(e)}></input>
                <input id = "inputUsername1" type = "text" placeholder="sender" name = "inputUsername1"
                  value = {this.state.inputUsername1} onChange = {(e) => this.changeHandler(e)}></input>
                <input id = "inputUsername2" type = "text" placeholder="receiver" name = "inputUsername2"
                  value = {this.state.inputUsername2} onChange = {(e) => this.changeHandler(e)}></input>
                <button onClick = {this.handleSubmit}>Submit</button>
            </div>
        )
    }
}
