import React, { Component } from "react";
import OrderDataStore from "../../services/OrderDataStore";

export class ListOrders extends Component {

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
                            <div className="col-md-2 orderListElement">Shutter sizes (w x h)</div>
                            <div className="col-md-1 orderListElement">Status</div>
                            <div className="col-md-1 orderListElement">Price</div>
                            <div className="col-md-1 orderListElement">Invoice</div>
                        </div>
                        {
                            this.props.orders.map((order, i) =>
                                <div key={i} className="row orderListElements">
                                    <div className="col-md-1 orderListElement">{i + 1}</div>
                                    <div className="col-md-2 orderListElement">{order.customer.name}</div>
                                    <div className="col-md-2 orderListElement">{order.customer.address}</div>
                                    <div className="col-md-2 orderListElement">{this.getDate(order.orderDate)} ({this.calculateDate(order.orderDate)} day(s) ago)</div>
                                    <div
                                        className="col-md-2 orderListElement">
                                        {order.shutter.width}mm x {order.shutter.height}mm
                                        </div>
                                    <div className="col-md-1 orderListElement">
                                        {order.shutter.isPaid ?
                                            "Paid"
                                            : order.shutter.isFinished ?
                                                "Finished"
                                                : "Working..."
                                        }
                                    </div>
                                    <div className="col-md-1 orderListElement">
                                        {order.shutter.price > 0 ?
                                            this.makePriceFromInt(order.shutter.price)
                                            : order.shutter.isFinished ?
                                                <input type="number" name={"invoice" + order.id} id={"invoice" + order.id}></input>
                                                : "Not finished"
                                        }</div>
                                    <div className="col-md-1 orderListElement">
                                        {order.shutter.price > 0 ?
                                            order.shutter.isPaid ? "Success" : "Waiting"
                                            : order.shutter.isFinished ?
                                                <button onClick={()=> this.handleClickEvent(order.id)}>Invoice</button>
                                                : "-"
                                        }
                                    </div>
                                </div>)
                        }
                    </div>
                }
            </div>)
    }
}