import React, { Component } from "react";
import fire from "../../config/Fire";

class Register extends Component {
    state = {
        email: "",
        password: "",
        displayName:"",
        fireErrors: "",
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register =(e) =>{
        e.preventDefault();
        //firebase hooks
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) =>{
            let currentUser = fire.auth().currentUser;
            currentUser.updateProfile({
                displayName: this.state.displayName,
                displayPics:this.state.displayPics
            })
        }).catch((error) =>{
            this.setState({fireErrors:error.message})
        });
    }


    render(){

        let errorNotify = this.state.fireErrors ? 
        (<div className="errors"> {this.state.fireErrors}</div>) :null;
        return (
            <>
            {errorNotify}
            <form>
                <input type="text" 
                className="reg" 
                placeholder="Your Name" 
                onChange={this.handleChange}
                value={this.state.displayName}
                name="displayName"/>

                <input type="text" 
                className="reg" 
                placeholder="Email" 
                onChange={this.handleChange}
                value={this.state.email}
                name="email"/>

                <input type="password" 
                className="reg" 
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password} 
                name="password"/>

                <input type="text" 
                className="reg" 
                placeholder="Job Description" 
                name="job"/>

                <input type="text" 
                className="reg" 
                placeholder="Location" 
                name="Location"/>

                <input type="text" 
                className="reg" 
                placeholder="Department" 
                name="department"/>

                <label id="myFile" >Upload your profile picture</label>
                <input type="file" 
                accept="image/*"
                className="myFile"
                id="myFile" 
                name="displayPics"/>

                <input type="submit"
                 className="submitBtn" 
                 onClick={this.register}
                 value="REGISTER"/>
            </form>
            </>
        )
    }
}

export default Register;