import React, { Component } from "react";
import '../styles/main.scss';
import Login from './Forms/Login';

export default class Main extends Component{

    state={
        user:1,
        loading:true
    }
    render(){
        return(<>
            <div className="main">
                <Login/>
                <span className="extra">
                    Not Registered?  <button> Create an account</button>
                </span>
            </div>
        </>)
    }
}