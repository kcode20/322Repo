import React from 'react';
import '../docInvitation/docInvitation.css'
//Please include Owner ID and Doc ID as props...
export default class docInvitation extends React.Component{
    constructor(){
        super();
        this.state = {
            inputUsername: "",
        }
    }

    changeHandler = (event) => {
        this.setState({
            inputUsername: event.target.value,
        });
    }

    handleSubmit = () => {
        //this.props.DocID and this.props.ownerID are needed to proceed...
        console.log("you will be submitting the username below...");
        //Will submit this.props.DocID and this.props.ownerID and inputUsername...
        console.log(this.state.inputUsername);

        //Clearing the state, ready for more inputs...
        this.setState({
            inputUsername: "",
        })
    }
    render(){
        return(
            <div className = "form">
            <input id = "inputUsername" type = "text" placeholder="document ID"
                   value = {this.state.inputUsername} onChange = {(e) => this.changeHandler(e)}></input>
            <input id = "inputUsername" type = "text" placeholder="receiver"></input>
            <input id = "inputUsername" type = "text" placeholder="receiver"></input>
            <button onClick = {this.handleSubmit}>Submit</button>
            </div>
        )
    }
}
