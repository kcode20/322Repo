import React, { Component } from 'react';
import './complain.css';

class Complain extends Component{
    constructor(){
        super();
        this.state = {
            toggleComplainTo: 1, // 1 - Toggle complain to SU, -1 - to owner
            userName: "",
            note: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleHandler = () => {
        this.setState({toggleComplainTo: -1 * this.state.toggleComplainTo});
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("The form is submitted with the following data:");
        console.log(this.state);
        this.setState({
            toggleComplainTo: 1, // 1 - Toggle complain to SU, -1 - to owner
            firstName: "",
            lastName: "",
            email: "",
            note: "",
            DocID: "",
        });
    }

    render(){
        return(
            <div>
                <div className = "User_Interaction">
                    <button onClick = {this.toggleHandler}>Toggle Complain User</button>
                    {(this.state.toggleComplainTo === 1) ?
                        <div>
                            <p>Complain to Admin</p>
                        </div> 
                        :
                        <div>
                            <p>Complain to Owner of the Document</p>
                        </div>
                    }
                </div>
                <form className="FormCenter">
                    <input type="text" name="userName" className="FormField_Input" placeholder="First Name"
                           value = {this.state.userName} onChange = {e => this.handleChange(e)}/>
                    <textarea name="note" className="FormField_Input_Complain" placeholder="Complain" rows="4" cols="50"
                           value = {this.state.note} onChange = {e => this.handleChange(e)}/>
                    {/* <input type="text" name="DocID" className="FormField_Input" placeholder="Document ID"
                           value = {this.state.DocID} onChange = {e => this.handleChange(e)}/> */}
                </form>
                <div className = "User_Submit">
                    <button onClick={e => this.handleSubmit(e)}>Submit</button>
                </div>
                
            </div>
        );
    }
}

export default Complain;