import React, { Component } from 'react'

export default class ProcessComplain extends Component {
  constructor(props){
    super(props);
    this.state = {
        // username: [],
        // complain: [],
        username: ["Song", "Harmony", "Banana"],
        complain: ["i dont really like this", "Me too", "Same"],
    };
  }
  render(){
      let array = [];
      for(let i = 0; i < this.state.username.length; i++){
          array.push(
            <tr>
                <td>{this.state.username[i]}</td>
                <td>{this.state.complain[i]}</td>
                <button>Resolve</button>
            </tr>
          );
      }
      return(
          <div>
            <table>
                {array}
            </table>
          </div>
      )
  }
}