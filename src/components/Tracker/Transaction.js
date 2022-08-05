import React from "react";

const Transaction =(props)=>{


    return(
                <tr>
                    <td>{props.date}</td>
                    <td>{props.merchant}</td>
                    <td>{props.price}</td>
                    <td>{props.statuses}</td>
                    <td>{props.comment}</td>
                </tr>
    )
}

export default Transaction;