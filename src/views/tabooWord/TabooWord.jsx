import React, {Component} from 'react';
import './TabooWord.css'
class TabooWord extends Component{
    constructor(){
        super();
        this.state = {
            // word: ["Hi", "Bye", "Hello "],
            word: [],
            inputValue: "",
        };
    }

    componentDidMount = () => {
      fetch('http://localhost:8080/tabooword', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },

      })
        .then(response => {
          if(response.status >= 400){
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then(data => {
          this.setState({word: data});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    clickHandler = (e) => {
        e.preventDefault();
        const data = {
          tabooWord: this.state.inputValue,
        };
        fetch('http://localhost:8080/tabooSuggest', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(data),
        })
          .then(function(response) {
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            if (response.status === 200) {
              alert('Submitted Suggestion to Super User to be approved')
            }
          })
          .catch(function(err) {
            console.log(err);
          });
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
                {this.state.word.map(( taboo, key ) => {
                    return (
                        <div>
                            <li key={key}>{taboo.tabooWord}</li>
                        </div>
                    )
                })}
            </div>
        )
        return(
            <div>
                <div className = "TabooDiv">
                    <p>Taboo World Submission Page</p>
                    {array}
                    <p><i>Please submit one at a time...</i></p>

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
