import React from "react";

const Transaction =(props)=>{


    return(
        <li>
            <div>{props.date}</div>
            <div>{props.type}</div>
            <div>{props.price}</div>
            <div>{props.statuses}</div>
            <div>{props.comment}</div>
           
        </li>
    )
}

export default Transaction;