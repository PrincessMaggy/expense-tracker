import React, { Component } from "react";
import fire from "../../config/Fire";

class Login extends Component {
    state = {
        email: "",
        password: "",
        fireErrors: ""
    }

    handleChange =(e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    login =(e)=>{
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error)=>{
            this.setState({fireErrors: error.message})
        })
    }

    render(){

        let errorNotify = this.state.fireErrors?
        (<div className="errors">{this.state.fireErrors}</div>): null
        return (
            <>
            {errorNotify}
            <form>
                <input type="text" 
                className="reg" 
                placeholder="Email" 
                value={this.state.email}
                onChange={this.handleChange}
                name="email"/>

                <input type="password" 
                className="reg" 
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange} 
                name="password"/>

                <input type="submit"
                 className="submitBtn" 
                 onClick={this.login}
                 value="LOG IN"/>
            </form>
            </>
        )
    }
}

export default Login;