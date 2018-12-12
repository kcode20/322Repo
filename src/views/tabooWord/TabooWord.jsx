import React, {Component} from 'react';
import './TabooWord.css'
class TabooWord extends Component{
    constructor(){
        super();
        this.state = {
            word: "",
        };
    }

    clickHandler = (e) => {
        e.preventDefault();
        console.log("The form is submitted with the following data:");
        console.log(this.state);
        this.setState({
            word: "",
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        return(
            <div>
                <div className = "TabooDiv">
                    <p>Taboo World Submission Page</p>
                    <p><i>Please submit one at a time...</i></p>
                </div>
                <div className="FormCenter">
                    <form >
                        <input type="text" name="word" className="FormField_Input" placeholder="Word"
                            value = {this.state.word} onChange = {e => this.handleChange(e)}/>
                    </form>
                    <button onClick = {e => this.clickHandler(e)}>Submit</button>
                </div>

            </div>
        );
    }
}

export default TabooWord;