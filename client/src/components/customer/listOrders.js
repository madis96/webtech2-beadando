import React, { Component } from "react";

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

    getTime = (orderDate) =>{
        var date = new Date(orderDate);

        return date.getHours() + " hours " + date.getMinutes() + " minutes";
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
                    <h3>
                        {this.props.customerData.name}'s order(s)
                    </h3>
                    {
                        this.props.ownOrders.length === 0 &&
                        <div className="row">
                            Sorry, you don't have any orders yet.
                        </div>
                    }
                </div>
                {this.props.ownOrders.length === 0 ?
                    <div/>
                    :
                    <div className="row orderList">
                        <div className="row orderListTitle">
                            <div className="col-md-1 orderListElement">ID</div>
                            <div className="col-md-2 orderListElement">Name</div>
                            <div className="col-md-4 orderListElement">Address</div>
                            <div className="col-md-2 orderListElement">Shutter sizes (w x h)</div>
                            <div className="col-md-1 orderListElement">Status</div>
                            <div className="col-md-1 orderListElement">Price</div>
                            <div className="col-md-1 orderListElement">Pay</div>
                        </div>
                        {
                            this.props.ownOrders.map((order, i) =>
                                <div key={i}>
                                <div className="row orderListElements" onClick={() => this.setSelectedOrder(order.id)}>
                                    <div className="col-md-1 orderListElement">{i + 1}</div>
                                    <div className="col-md-2 orderListElement">{order.customer.name}</div>
                                    <div className="col-md-4 orderListElement">{order.customer.address}</div>
                                    <div
                                        className="col-md-2 orderListElement">
                                        {order.shutter.width}mm x {order.shutter.height}mm</div>
                                    <div className="col-md-1 orderListElement">
                                        {order.shutter.isPaid ?
                                            "Paid"
                                            : order.shutter.isFinished ?
                                                "Assemblied"
                                                : "Ordered"
                                        }
                                    </div>
                                    <div className="col-md-1 orderListElement">
                                        {order.shutter.price > 0 ?
                                            this.makePriceFromInt(order.shutter.price)
                                            : "-"
                                        }
                                    </div>
                                    <div className="col-md-1 orderListElement">
                                        {order.shutter.price > 0 ?
                                            order.shutter.isPaid ? "Success" : <button onClick={()=> this.props.payOrder(order.id)}>Pay</button>
                                            : "No invoice"
                                        }
                                    </div>
                                </div>
                                    {this.state.selectedOrder === order.id ?
                                        <div className="row" onClick={() => this.setSelectedOrder(order.id)}>
                                            <div className="informationContainer">
                                                <div className="informationTitle">Order informations</div>
                                                <div className="row informationElement">
                                                    <div className="col-md-6">Ordered:</div>
                                                    <div className="col-md-6">
                                                        {this.getDate(order.orderDate)} ({this.calculateDate(order.orderDate)} day(s) ago)
                                                    </div>
                                                </div>
                                                <div className="row informationElement">
                                                    <div className="col-md-6"></div>
                                                    <div className="col-md-6">
                                                        {this.getTime(order.orderDate)}
                                                    </div>
                                                </div>
                                                <div className="row informationElement">
                                                    <div className="col-md-6">Last modified:</div>
                                                    <div className="col-md-6">
                                                        {this.getDate(order.lastModified)} ({this.calculateDate(order.lastModified)} day(s) ago)
                                                    </div>
                                                </div>
                                                <div className="row informationElement">
                                                    <div className="col-md-6"></div>
                                                    <div className="col-md-6">
                                                        {this.getTime(order.lastModified)}
                                                    </div>
                                                </div>
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