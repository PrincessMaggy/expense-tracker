import React, { Component } from "react";
import '../styles/main.scss';
import Login from './Forms/Login';
import Register from "./Forms/Register";

export default class Main extends Component{

    state={
        user:1,
        loading:true,
        formSwitch:false
    }

    formSwitch = (action) =>{
        this.setState({
            formSwitch: action === 'register'? true: false
        })
    } 
    render(){
        const form = !this.state.formSwitch ? <Login/> : <Register/>;
        return(
        <>
                <div className="main">
                    {form}
                    {!this.state.formSwitch ? ( <span className="extra">
                        Not Registered?  <button 
                        onClick={()=> this.formSwitch(!this.state.formSwitch? 'register': 'login')}> 
                        Create an account</button>
                    </span>) :(<span className="extra">
                        Have an account?  <button 
                        onClick={()=> this.formSwitch(!this.state.formSwitch? 'register': 'login')}> 
                        Sign in Here</button>
                    </span>)

                    }
                </div>
        </>)
    }
}