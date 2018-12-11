import React, {Component} from 'react';

class OUApplication extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
        };
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("The form is submitted with the following data:");
        console.log(this.state);
        this.setState({
            username: "",
        });
    }

    render(){
        return(
            <div>
                <div className = "User_Interaction">
                    <p>Application for Ordinary User</p>
                </div>
                <form className="FormCenter">
                    <input type="text" name="username" className="FormField_Input" placeholder="User Name"
                           value = {this.state.username} onChange = {e => this.handleChange(e)}/>
                </form>
                <div className = "User_Submit">
                    <button onClick={e => this.handleSubmit(e)}>Submit</button>
                </div>
            </div>
        );
    }
}

export default OUApplication;