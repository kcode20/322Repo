import React, {Component} from 'react';
import '../searchAboutOU/SearchAboutOU.css'
export default class SearchAboutOU extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            interest: "",
            user: ["Song", "Ren", "Zhao"], //this will be fetched from the database... Dummy data added now...
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = () => {
        //Passing name and interest to database...
        console.log(this.state);
    }

    render(){
        return(
            <div className = "form">
                <input type = "text" placeholder="Files Name" name = "name"
                       value = {this.state.searchInput} onChange = {(e) => this.changeHandler(e)}></input>
                <input type = "text" placeholder="Interest" name = "interest"
                       value = {this.state.searchInput} onChange = {(e) => this.changeHandler(e)}></input>
                <button onClick = {this.handleSubmit}>Submit</button>
                {this.state.user.map((user, index) => {
                    return(
                        <div>
                            <li>{this.state.user[index]}</li>
                        </div>
                    )
                })}
            </div>
        );
    }
}