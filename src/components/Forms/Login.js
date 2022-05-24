import React, { Component } from "react";

class Login extends Component {
    state = {
        email: "",
        password: "",
        fileErrors: ""
    }

    render(){
        return (
            <>
            <form>
                <input type="text" 
                className="reg" 
                placeholder="Email" 
                name="email"/>

                <input type="password" 
                className="reg" 
                placeholder="Password" 
                name="password"/>

                <input type="submit"
                 className="submitBtn" 
                 value="ENTER"/>
            </form>
            </>
        )
    }
}

export default Login;