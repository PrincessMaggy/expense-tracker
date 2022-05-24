import React, { Component } from "react";

class Register extends Component {
    state = {
        email: "",
        password: "",
        displayName:"",
        fileErrors: ""
    }

    render(){
        return (
            <>
            <form>
                <input type="text" 
                className="reg" 
                placeholder="Your Name" 
                name="name"/>

                <input type="text" 
                className="reg" 
                placeholder="Email" 
                name="email"/>

                <input type="password" 
                className="reg" 
                placeholder="Password" 
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
                className="myFile"
                id="myFile" 
                name="filename"/>

                <input type="submit"
                 className="submitBtn" 
                 value="REGISTER"/>
            </form>
            </>
        )
    }
}

export default Register;