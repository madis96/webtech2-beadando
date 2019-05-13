import React, { Component } from "react";

export class ListOrders extends Component {

    checkPrice = (price) =>{
        if(price < 1 || isNaN(price)){
            return false
        }
        return true
    };

    handleClickEvent = (id) =>{
            this.props.createInvoice(id);

    };

    handleClick = (id) =>{
        this.props.setSelectedOrder(id);
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
            <div className="container">
                {
                    this.props.orders.length === 0 &&
                    <div className="row">
                        Sorry, no unfinished jobs.
                    </div>
                }
            </div>
            {this.props.orders.length === 0 ?
                <div/>
                :
                <div className="row orderList">
                    <div className="row orderListTitle">
                        <div className="col-md-2 orderListElement">ID</div>
                        <div className="col-md-3 orderListElement">Shutter sizes (w x h)</div>
                        <div className="col-md-3 orderListElement">Ordered</div>
                        <div className="col-md-2 orderListElement">Priority</div>
                        <div className="col-md-2 orderListElement">Finish</div>
                    </div>
                    {
                        this.props.orders.map((order, i) =>
                            <div key={i}>
                            <div className="row orderListElements" onClick={() => this.handleClick(order.id)}>
                                <div className="col-md-2 orderListElement">{i + 1}</div>
                                <div
                                    className="col-md-3 orderListElement">
                                    {order.shutter.width}mm x {order.shutter.height}mm
                                </div>
                                <div
                                    className="col-md-3 orderListElement">
                                    {this.getDate(order.orderDate)} ({this.calculateDate(order.orderDate)} day(s) ago)
                                </div>
                                <div
                                    className="col-md-2 orderListElement">
                                    {this.calculateDate(order.orderDate) > 10?
                                        "Important"
                                        : this.calculateDate(order.orderDate) > 5?
                                            "So-so"
                                            : "Unimportant"
                                    }
                                </div>
                                <div className="col-md-2 orderListElement">
                                    <button onClick={() => this.props.finishOrder(order.id)}>Finish</button>
                                </div>
                            </div>
                                {this.props.selectedOrder === order.id ?
                                    <div className="row" onClick={() => this.handleClick(order.id)}>
                                        <div className="informationContainer">
                                            <div className="informationTitle">Parts informations</div>
                                            <div className="row informationElement">
                                                <div className="col-md-6">Board:</div>
                                                <div className="col-md-6">{order.shutter.parts.board}</div>
                                            </div>
                                            <div className="row informationElement">
                                                <div className="col-md-6">Connector:</div>
                                                <div className="col-md-6">{order.shutter.parts.connector}</div>
                                            </div>
                                            <div className="row informationElement">
                                                <div className="col-md-6">Rope:</div>
                                                <div className="col-md-6">{order.shutter.parts.rope}</div>
                                            </div>
                                        </div>
                                    </div>
                                    : <div/>
                                }
                            </div>
                        )
                    }
                </div>
            }
        </div>)
    }
}