import React, { Component} from "react";
import fire from "../../config/Fire";
import Transaction from "./Transaction";

class Tracker extends Component{
   
state ={
    transactions:[],
    money:0,
    comment: "",
    merchant:"",
    price:"",
    dates:"",
    statuses:"",
    currentUID: fire.auth().currentUser.uid,
    image:"",
    val:"none",
    searchResults:[],
    filterExist:false,
    price1:0,
    price2:0
}

    //reload page
    loadup(){
        window.location.reload(true);
    }

    //Executes Tracker component
    handleExecution =()=>{
    if(this.state.filterExist){
        return this.state.searchResults
    }
    else{
        return this.state.transactions
    }
    }

     //handle filter
    handleFilter =(e)=>{
        
        this.setState({
            filterExist:true
        })
        if(e.target.id === "date"){ 
            const filt= this.state.transactions.filter(data=> data.dates === e.target.value)
            this.setState({
                searchResults:filt
            })
       }


        if(e.target.id === "type"){ 
                const filt= this.state.transactions.filter(data=> data.merchant === e.target.value)
                this.setState({
                    searchResults:filt
                })
           }


        if(e.target.name === "statuses"){
            const filt= this.state.transactions.filter(data =>data.statuses === e.target.value)
            this.setState({
                searchResults:filt
            })
           }


        if (e.target.name === "cash"){
           

            const filt =this.state.transactions.filter(data =>data.price >= this.state.price1)
            this.setState({
                searchResults:filt
            })
           }
    }

    //load image
    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({image: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
        }
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
            comment,
            merchant,
            price,
            currentUID,
            dates,
            image,
            statuses,
            money
        }= this.state;

    //validation
    if(comment && merchant && price){
        const backUpState = this.state.transactions;
        backUpState.push({
            id: backUpState.length + 1,
            comment: comment,
            merchant: merchant,
            dates:dates,
            statuses:statuses,
            price: price,
            image:image,
            user_id: currentUID
        });

        fire.database().ref('Transactions/' + currentUID).push({
            id: backUpState.length,
            comment: comment,
            merchant: merchant,
            dates:dates,
            price: price,
            image:image,
            statuses:statuses,
            user_id: currentUID
        }).then((data) =>{
            //successful callback?
            console.log("success");
            this.setState({
                transactions: backUpState,
                money: statuses === 'Reimbursed'? money + parseFloat(price) : 0 + money,
                comment:"",
                merchant:'',
                dates:"",
                image:"",
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
                    comment:childSnapshot.val().comment,
                    merchant:childSnapshot.val().merchant,
                    price:childSnapshot.val().price,
                    dates:childSnapshot.val().dates,
                    image:childSnapshot.val().image,
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
                        {/* <span>Welcome, {currentUser.displayPics}!</span> */}
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
                                    <select name="merchant"
                                    value={this.state.merchant}
                                    onChange={this.handleChange("merchant")}>
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
                                name="comment"
                                value={this.state.comment}
                                maxLength="50"
                                onChange={this.handleChange("comment")}></textarea><br/>
                                
                                <label>Upload receipt</label>
                                <input type="file"
                                onChange={this.onImageChange}
                                id="group_image" 
                                required/> <br/>

                                <img  id="target" src={this.state.image}  alt=""/>

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
                            <tbody>
                                {   Object.keys(this.handleExecution()).map((id)=>(
                                    <Transaction  key={id}
                                    date ={this.handleExecution()[id].dates}
                                    merchant ={this.handleExecution()[id].merchant}
                                    statuses ={this.handleExecution()[id].statuses}
                                    comment ={this.handleExecution()[id].comment}
                                    price ={this.handleExecution()[id].price}
                                    image ={this.handleExecution()[id].image}
                                    />
                                ))} 
                                
                                </tbody>
                            </table>
                        </div>
                        <div style={{display:this.state.val}}>Right here</div>
                </div>

                <div className="third">
                     <div className="totalCash">TOTAL EXPENSE: ${this.state.money}</div>

                     <div className="filters">

                        <div className="topF">
                            <div className="filterHead">Filter Expenses</div>
                            <div><a href="./" className="clearF" onClick={this.loadup}>Clear Filters</a></div>
                        </div>

                        <div className="mainFilter">
                            <label>From</label> <br/>
                            <input type="date" 
                            id="date" 
                            onChange={this.handleFilter}
                            /><br/>

                            <label>To</label><br/>
                            <input type="date" 
                            id="date" 
                            onChange={this.handleFilter}
                             /><br/>

                            <div className="lab">
                                <label>Min</label>
                                <label>Max</label>
                            </div>
                            <div className="labin">
                                <input type="text"
                                 id="cashmin" 
                                 name="Price"
                                 value={this.state.price1}
                                onChange={this.handleFilter}
                                 placeholder="$"/>

                                <span>-</span>

                                <input type="text"
                                 id="cashmax" 
                                 name="Price"
                                 value={this.state.price2}
                                onChange={this.handleFilter}
                                 placeholder="$"/>
                            </div>

                            <label>Merchant:</label>
                                    <select
                                    id="type"
                                    onChange={this.handleFilter}
                                    >
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

                                    <label>Status</label><br/> 
                                    <input type="radio" 
                                    onChange={this.handleFilter}
                                    name="statuses"
                                    id="new"
                                    value="New"/> 
                                    <label htmlFor="new">New</label>

                                    <input type="radio" 
                                    onChange={this.handleFilter}
                                    name="statuses"
                                    id="re"
                                    value ="Reimbursed"/> 
                                    <label htmlFor="re">Reimbursed</label>
                                    
                                    <input type="radio" 
                                    onChange={this.handleFilter}
                                    value="In Progress"
                                    id="progress"
                                    name="statuses"/> 
                                    <label htmlFor="progress">In Progress</label>
                        </div>


                     </div>
                </div>
            </div>
        </>
        )
    }
}

export default Tracker;