import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
import '../login.css'
class SignInForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            // level: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
      const { history } = this.props;
      e.preventDefault();
      var data = {
    		username: this.state.username,
    		password: this.state.password,
    	};
      console.log(JSON.stringify(data));
  		fetch('http://localhost:8080/login', {
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
            history.push('/signin');
  					throw new Error('Bad response from server');
            // history.push('/signin');
  				}
  				if (response.status === 200) {
  					history.push('/document');
  				}
  				// return response.json();
  			})
  			.catch(function(err) {
  				console.log(err);
  			});
      console.log('The form was submitted with the following data:');
      console.log(this.state);
    }
    render() {
        return (
            <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/signin" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

            <div className="FormTitle">
                <NavLink to="/signin" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
                or
                <NavLink exact to="/signup" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>
            <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input id="username" className="FormField__Input" placeholder="Enter your username" name="username" value={this.state.username} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button> <Link to="/signup" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
          </div>
        </div>
        );
    }
}

export default SignInForm;
