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

    deleteNotifHandler = (index) => {
        const DocID = [...this.state.DocID];
        DocID.splice( index, 1 );
        this.setState( { DocID: DocID } );
        console.log(this.state);
    }

    acceptNotifHandler = (index) => {
        const DocID = [...this.state.DocID];
        DocID.splice( index, 1 );
        this.setState( { DocID: DocID } );
        console.log(this.state);
    }


    render(){
        let array;
        array = (
            <div>
                {this.state.DocID.map(( docid, index ) => {
                    return (
                        <div>
                            <td>{this.state.DocID[index]}</td>
                            <button onClick={() => this.acceptNotifHandler(index)}>Accept</button>
                            <button onClick={() => this.deleteNotifHandler(index)}>Decline</button>
                        </div>
                    )
                })}
            </div>
        )
        return(
            <div className = "InvitationForm">
                {/* {this.state.persons.map(( docid, index ) => {
                    <td>{this.state.DocID[i]}</td>
                    <button>Accept</button>
                    <button onClick={(event) => this.deletePersonHandler(index)}>Decline</button>
                })} */}
                {array}
            </div>
        );
    }
}

export default Invitation;