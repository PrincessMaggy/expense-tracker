import React, { Component } from "react";
import fire from "../../config/Fire";

class Tracker extends Component{
    //logout
    logout =()=>{
        fire.auth().signOut();
    }

    render(){
        return(
            <>
            <button onClick={this.logout}>LOG OUT</button>
            </>
        )
    }
}

export default Tracker;