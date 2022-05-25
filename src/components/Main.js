import React, { Component } from "react";
import '../styles/main.scss';


import fire from "../config/Fire";
import Login from './Forms/Login';
import Register from "./Forms/Register";
import Tracker from "./Tracker/Tracker";

export default class Main extends Component{

    state={
        user:1,
        loading:true,
        formSwitch:false
    }

    //if registration was successful
    componentDidMount(){
        this.authListener();
    }

    //update user state
    authListener(){
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({user});
            }else{
                this.setState({user:null})
            }
        })
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
            {!this.state.user?
                (<div className="main">
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
                </div>) : (<Tracker/>)
      }  </>)
    }
}