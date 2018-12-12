import React, {Component} from 'react';
import './TabooWord.css'
class TabooWord extends Component{
    constructor(){
        super();
        this.state = {
            word: ["Hi", "Bye", "Hello "],
            inputValue: "",
        };
    }

    clickHandler = (e) => {
        e.preventDefault();
        //this.state.inputValue 
        console.log("The form is submitted with the following data:");
        console.log(this.state.inputValue);
        this.setState({inputValue: ""});
        
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        })
    }

    render(){
        let array = (
            <div>
                {this.state.word.map(( word, index ) => {
                    return (
                        <div>
                            <li>{this.state.word[index]}</li>
                        </div>
                    )
                })}
            </div>
        )
        return(
            <div>
                <div className = "TabooDiv">
                    <p>Taboo World Submission Page</p>
                    <p><i>Please submit one at a time...</i></p>
                    {array}
                </div>
                <div className="FormCenter">
                    <form >
                        <input type="text" className="FormField_Input" placeholder="Word"
                            value = {this.state.inputValue} onChange = {this.handleChange}/>
                    </form>
                    <button onClick = {this.clickHandler}>Submit</button>
                </div>

            </div>
        );
    }
}

export default TabooWord;