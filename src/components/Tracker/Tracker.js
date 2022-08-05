import React, { Component} from "react";
import {useForm} from "react-hook-form";
import fire from "../../config/Fire";
import Transaction from "./Transaction";

class Tracker extends Component{
   
state ={
    transactions:[],
    money:0,
    transactionName: "",
    transactionType:"",
    price:"",
    dates:"",
    statuses:"",
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
            dates,
            statuses,
            money
        }= this.state;

    //validation
    if(transactionName && transactionType && price){
        const backUpState = this.state.transactions;
        backUpState.push({
            id: backUpState.length + 1,
            name: transactionName,
            type: transactionType,
            dates:dates,
            statuses:statuses,
            price: price,
            user_id: currentUID
        });

        fire.database().ref('Transactions/' + currentUID).push({
            id: backUpState.length,
            name: transactionName,
            type: transactionType,
            dates:dates,
            price: price,
            statuses:statuses,
            user_id: currentUID
        }).then((data) =>{
            //successful callback?
            console.log("success");
            this.setState({
                transactions: backUpState,
                money: statuses === 'Reimbursed'? money + parseFloat(price) : 0 + money,
                transactionName:"",
                transactionType:'',
                dates:"",
                statuses:"",
                price: ''
            })
        })
    }
    }
// lifecycle
    componentWillMount(){
        const {currentUID, money} = this.state;
        let totalMoney = money;
        const backUpState = this.state.transactions;
        fire.database().ref('Transactions/' + currentUID).once('value',
        (snapshot)=>{
            snapshot.forEach((childSnapshot) =>{
                totalMoney =
                childSnapshot.val().statuses !== 'Reimbursed'?
                parseFloat(childSnapshot.val().price) + totalMoney:0 + totalMoney

                backUpState.push({
                    id:childSnapshot.val().id,
                    name:childSnapshot.val().name,
                    type:childSnapshot.val().type,
                    price:childSnapshot.val().price,
                    dates:childSnapshot.val().dates,
                    statuses:childSnapshot.val().statuses,
                    user_id:childSnapshot.val().user_id
                });
            });
            this.setState({
                transactions: backUpState,
                money: totalMoney
            })
        });
    }
    render(){

        let currentUser = fire.auth().currentUser;
        return(
            <>
            <div className="welcome">
                        <span>Welcome, {currentUser.displayName}!</span>
                        <button onClick={this.logout} className="exit">LOG OUT</button>
                    </div>

            <div className="tracker">
                <div className="trackerBlock">
                    
                    <div className="newTransactionBlock">
                        <div className="newTransaction">
                            <form>
                                
                            <div className="title">ADD EXPENSE</div>
                                <div className="inputGroup">
                                    <label>Merchant:</label>
                                    <select name="type"
                                    value={this.state.transactionType}
                                    onChange={this.handleChange("transactionType")}>
                                        <option value="0"></option>
                                        <option value="Taxi">Taxi</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Airline">Airline</option>
                                        <option value="Parking">Parking</option>
                                        <option value="Rental Car">Rental Car</option>
                                        <option value="Fast Food">Fast food</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Shuttle">Shuttle</option>
                                        <option value="Hotel">Hotel</option>
                                    </select><br/>

                                    <label>Status:</label>
                                    <select name="statuses"
                                    value={this.state.statuses}
                                    onChange={this.handleChange("statuses")}>
                                        <option value="0"></option>
                                        <option value="Reimbursed">Reimbursed</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="New">New</option>
                                    </select><br/>

                                    <label>Date:</label>
                                    <input type="date" 
                                    value={this.state.dates} 
                                    name="date" 
                                    onChange={this.handleChange('dates')} 
                                    required/>

                                    <label>Price:</label>
                                    <input
                                    placeholder="$"
                                    id="price"
                                    type="text"
                                    name="Price"
                                    value={this.state.price}
                                onChange={this.handleChange("price")}
                                /><br/>

                                <label>Comment</label>
                                <textarea
                                type="text"
                                name="transactionName"
                                value={this.state.transactionName}
                                onChange={this.handleChange("transactionName")}></textarea><br/>
                                
                                <label>Upload receipt</label>
                                <input type="file"
                                name="picture"
                                id="image" 
                                required/> <br/>
                                <img  id="preview"  alt=""/>

                                {/* <input type="reset" value="Cancel"/> */}
                                </div>

                                <input type="submit" 
                                className="addTransaction"
                                onClick={()=> this.addNewTransaction()}
                            value="Add Transaction"
                                />

                            </form>
                        </div>
                    </div> 
                </div>

                <div className="second">
                <div className="latestTransactions">
                        <p>Latest Transactions</p>
                        <table>
                        <thead>
                            <tr>
                                <td>Date</td>
                                <td>Merchant</td>
                                <td> Price</td>
                                <td>Status</td>
                                <td> Comment</td>
                            </tr>
                        </thead>
                            {Object.keys(this.state.transactions).map((id)=>(
                                <Transaction  key={id}
                                date ={this.state.transactions[id].dates}
                                type ={this.state.transactions[id].type}
                                statuses ={this.state.transactions[id].statuses}
                                comment ={this.state.transactions[id].name}
                                price ={this.state.transactions[id].price}
                                />
                            ))}
                        </table>
                    </div>
                </div>

                <div className="third">
                     <div className="totalCash">TOTAL EXPENSE: ${this.state.money}</div>
                </div>
            </div>
        </>
        )
    }
}

export default Tracker;