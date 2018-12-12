import React, {Component} from 'react'
import '../invitation/AccDenyInvitation.css'
class Invitation extends Component{
    constructor(props){
        super(props);
        this.state = {
            // DocID: [],
            DocID: ["0","1","2"],
        };
    }

    render(){
        let array = [];
        for(let i = 0; i < this.state.DocID.length; i++){
            array.push(
                <tr>
                    <td>{this.state.DocID[i]}</td>
                    <button>Accept</button>
                    <button>Decline</button>
                </tr>
            );
        }
        return(
            <div className = "InvitationForm">
                {array}
            </div>
        );
    }
}

export default Invitation;