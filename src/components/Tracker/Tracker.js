import React, { Component } from "react";
import fire from "../../config/Fire";

class Tracker extends Component{

state ={
    transactions:[],
    money:0,
    transactionName: "",
    transactionType:"",
    price:"",
    currentUID: fire.auth().currentUser.uid
}

    //logout
    logout =()=>{
        fire.auth().signOut();
    }

    //handles change
    handleChange = input => e =>{
        this.setState({
            [input] : e.target.value !=="0"? e.target.value: ""
        })
    }

    //handles new transaction
    addNewTransaction =()=>{
        const {
            transactionName,
            transactionType,
            price,
            currentUID,
            money
        }= this.state;

    //validation
    if(transactionName && transactionType && price){
        const backUpState = this.state.transactions;
        backUpState.push({
            id: backUpState.length + 1,
            name: transactionName,
            type: transactionType,
            price: price,
            user_id: currentUID
        });

        fire.database().ref('Transactions/' + currentUID).push({
            id: backUpState.length,
            name: transactionName,
            type: transactionType,
            price: price,
            user_id: currentUID
        }).then((data) =>{
            //successful callback?
            console.log("success");
            this.setState({
                transactions: backUpState,
                money: transactionType === 'deposit'? money + parseFloat(price) : money - parseFloat(price),
                transactionName:"",
                transactionType:'',
                price: ''
            })
        })
    }
    }
    render(){

        let currentUser = fire.auth().currentUser;
        return(
            <>

            <div className="trackerBlock">
                <div className="welcome">
                    <span>Welcome, {currentUser.displayName}!</span>
                    <button onClick={this.logout} className="exit">LOG OUT</button>
                </div>

                <div className="totalCash">BALANCE: ${this.state.money}</div>

                <div className="newTransactionBlock">
                    <div className="newTransaction">
                        <form>
                            <input
                            placeholder="Transaction Name"
                            type="text"
                            name="transactionName"
                            value={this.state.transactionName}
                            onChange={this.handleChange("transactionName")}
                            />

                            <div className="inputGroup">
                                <select name="type"
                                value={this.state.transactionType}
                                onChange={this.handleChange("transactionType")}>
                                    <option value="0">Type</option>
                                    <option value="expense">Expense</option>
                                    <option value="deposit">Deposit</option>
                                </select>

                                <input
                                placeholder="Price"
                                type="text"
                                name="Price"
                                value={this.state.price}
                            onChange={this.handleChange("price")}
                            />
                            </div>

                        </form>
                        <button 
                            className="addTransaction"
                            onClick={()=> this.addNewTransaction()}> 
                            + Add Transaction
                            </button>
                    </div>
                </div>

                <div className="latestTransactions">
                    <p>Latest Transactions</p>
                    <ul>
                        <li>
                        <div>ATM Deposit</div>
                        <div>+$5</div>
                        </li>
                    </ul>
                </div>
            </div>
            </>
        )
    }
}

export default Tracker;