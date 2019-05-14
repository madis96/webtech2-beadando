import React, { Component } from "react";
import OrderDataStore from "../../services/OrderDataStore";

export class ListOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOrder: 0
        };

    }

    setSelectedOrder = (orderId) =>{
        if(orderId === this.state.selectedOrder){
            this.setState({selectedOrder : 0});
            return;
        }
        this.setState({selectedOrder : orderId});
    };

    checkPrice = (price) =>{
        if(price < 1 || isNaN(price)){
            return false
        }
        return true
    };

    handleClickEvent = (id) =>{
        var price = parseInt(document.getElementById("invoice" + id).value);
        if(this.checkPrice(price)){
            this.props.createInvoice(id, price);
        }
    };

    makePriceFromInt = (value) => {
        return value.toLocaleString()  + " HUF";
    };

    getDate = (orderDate) =>{
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date(orderDate);

        return date.getFullYear() + ". " + monthNames[date.getMonth()] + " " + date.getDate() + ".";
    };

    calculateDate = (orderDate) =>{
        var date = new Date(orderDate);
        var currentDate = new Date();

        const diffTime = Math.abs(currentDate.getTime() - date.getTime());

        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    };


    render() {

        return (
            <div>
                {this.props.orders.length === 0 ?
                    <div className="container">
                        <div className="row">
                            Sorry, no orders yet.
                        </div>
                    </div>
                    :
                    <div className="row orderList">
                        <div className="row orderListTitle">
                            <div className="col-md-1 orderListElement">ID</div>
                            <div className="col-md-2 orderListElement">Customer's name</div>
                            <div className="col-md-2 orderListElement">Customer's address</div>
                            <div className="col-md-2 orderListElement">Order date</div>
                            <div className="col-md-2 orderListElement">Number of shutters</div>
                            <div className="col-md-1 orderListElement">Status</div>
                            <div className="col-md-1 orderListElement">Price</div>
                            <div className="col-md-1 orderListElement">Invoice</div>
                        </div>
                        {
                            this.props.orders.map((order, i) =>
                                <div key={i}>
                                <div className="row orderListElements">
                                    <div className="col-md-1 orderListElement" onClick={() => this.setSelectedOrder(order.id)}>{i + 1}</div>
                                    <div className="col-md-2 orderListElement">{order.customer.name}</div>
                                    <div className="col-md-2 orderListElement">{order.customer.address}</div>
                                    <div className="col-md-2 orderListElement">{this.getDate(order.orderDate)} ({this.calculateDate(order.orderDate)} day(s) ago)</div>
                                    <div
                                        className="col-md-2 orderListElement">
                                        {order.shutter.length}
                                        </div>
                                    <div className="col-md-1 orderListElement">
                                        {order.isPaid ?
                                            "Paid"
                                            : order.isFinished ?
                                                "Finished"
                                                : "Working..."
                                        }
                                    </div>
                                    <div className="col-md-1 orderListElement">
                                        {order.price > 0 ?
                                            this.makePriceFromInt(order.price)
                                            : order.isFinished ?
                                                <input type="number" name={"invoice" + order.id} id={"invoice" + order.id}></input>
                                                : "Not finished"
                                        }</div>
                                    <div className="col-md-1 orderListElement">
                                        {order.price > 0 ?
                                            order.isPaid ? "Success" : "Waiting"
                                            : order.isFinished ?
                                                <button onClick={()=> this.handleClickEvent(order.id)}>Invoice</button>
                                                : "-"
                                        }
                                    </div>
                                </div>
                                    {this.state.selectedOrder === order.id ?
                                        <div className="row" onClick={() => this.setSelectedOrder(order.id)}>
                                            <div className="informationContainer">
                                                <div className="informationTitle">Order informations</div>
                                                <div className="row informationElements">
                                                    <div className="col-md-2">ID</div>
                                                    <div className="col-md-3">sizes</div>
                                                    <div className="col-md-2">Board: {order.parts.board}</div>
                                                    <div className="col-md-2">Connector: {order.parts.connector}</div>
                                                    <div className="col-md-2">Rope: {order.parts.rope}</div>
                                                </div>
                                                {order.shutter.map((orders, j) =>
                                                    <div key={j}>
                                                        <div className="row informationElements">
                                                            <div className="col-md-2">{j+1}</div>
                                                            <div className="col-md-3">{orders.width}mm x {orders.height}mm</div>
                                                        </div>
                                                    </div>)}
                                                </div>
                                        </div>
                                        : <div/>
                                    }
                                </div>)
                        }
                    </div>
                }
            </div>)
    }
}