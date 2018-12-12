import React from 'react';

export default class SearchFiles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userID: "01",
            DocID: ["First Document", "Second Document", "Third Document"], //This has to be fetch from the data base.
            DocLink: ["link1", "link2", "link3"], //Has to correspond to DocID
            searchInput: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            userID: this.props.userID
            //DocID: Whatever you are fetching
            //DocLink: Whatever you are fetching
        });
    }

    changeHandler = (e) => {
        this.setState({
            searchInput: e.target.value,
        });
    }

    handleSubmit = () => {
        console.log("The following will be passed to the database...");
        console.log(this.state.userID);
        console.log(this.state.searchInput);
        console.log(this.state.DocID);
    }

    render(){
        return(
            <div className = "SearchFiles">
                <input type = "text" placeholder="Files Name"
                       value = {this.state.searchInput} onChange = {(e) => this.changeHandler(e)}></input>
                <button onClick = {this.handleSubmit}>Submit</button>
                <div>
                <table>
                {this.state.DocID.map(( docid, index ) => {
                    return (
                        <div>
                            <tr>
                                <td>{this.state.DocID[index]}</td>
                                <td>{this.state.DocLink[index]}</td>
                            </tr>
                        </div>
                    )
                })}
                </table>
            </div>

            </div>
        )
    }


}