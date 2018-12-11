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

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClickHandler = () => {
        this.setState({toggleComplainTo: -1 * this.state.toggleComplainTo});
    }

    onSubmit = event => {
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
                <button onClick = {this.onClickHandler}>Toggle Complain User</button>
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
                           value = {this.state.firstName} onChange = {e => this.changeHandler(e)}/>
                    <input type="text" name="lastName" className="FormField_Input" placeholder="Last Name"
                           value = {this.state.lastName} onChange = {e => this.changeHandler(e)}/>
                    <input type="text" name="email" className="FormField_Input" placeholder="Email"
                           value = {this.state.email} onChange = {e => this.changeHandler(e)}/>
                    <input type="text" name="note" className="FormField_Input" placeholder="Complain"
                           value = {this.state.note} onChange = {e => this.changeHandler(e)}/>
                    <input type="text" name="DocID" className="FormField_Input" placeholder="Document ID"
                           value = {this.state.DocID} onChange = {e => this.changeHandler(e)}/>
                    <button onClick={e => this.onSubmit(e)}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Complain;