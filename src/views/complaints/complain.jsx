import React, { Component } from 'react';
//import './complain.css';

class Complain extends Component{
    constructor(){
        super();
        this.state = {
            toggleComplainTo: 1, // 1 - Toggle complain to SU, -1 - to owner
            firstName: "",
            lastName: "",
            email: "",
            note: "",
            DocID: "",
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
        // let Toggle;
        // if(this.state.toggleComplainTo === 1){
        //     Toggle = (
        //         <div>
        //             <p>Complain to Admin</p>
        //         </div>
        //     );
        // }else{
        //     Toggle = (
        //         <div>
        //             <p>Complain to Owner of the Document</p>
        //         </div>
        //     );
        // }

        return(
            <div>
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
                <form className="FormCenter">
                    <input type="text" name="firstName" className="FormField_Input" placeholder="First Name"
                           value = {this.state.firstName} onChange = {e => this.handleChange(e)}/>
                    <input type="text" name="lastName" className="FormField_Input" placeholder="Last Name"
                           value = {this.state.lastName} onChange = {e => this.handleChange(e)}/>
                    <input type="text" name="email" className="FormField_Input" placeholder="Email"
                           value = {this.state.email} onChange = {e => this.handleChange(e)}/>
                    <input type="text" name="note" className="FormField_Input" placeholder="Complain"
                           value = {this.state.note} onChange = {e => this.handleChange(e)}/>
                    <input type="text" name="DocID" className="FormField_Input" placeholder="Document ID"
                           value = {this.state.DocID} onChange = {e => this.handleChange(e)}/>
                    <button onClick={e => this.handleSubmit(e)}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Complain;