import React, { Component } from "react";
import axios from "axios";
import {ListOrders} from "./listOrders";
import OrderDataStore from "./../../services/OrderDataStore"
import OrderDataActions from "./../../services/OrderDataActions"
import {StatisticContainer} from "./statisticContainer";

export class ManagerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: []
        };

    }

    onOrderDataChange = () => {
        this.setState({orders : OrderDataStore._orders.orderData});
    };

    componentDidMount() {
        OrderDataStore.addChangeListener(this.onOrderDataChange);
        OrderDataActions.refreshOrderList();
    }

    componentWillUnmount() {
        OrderDataStore.removeChangeListener(this.onOrderDataChange);
    }

    createInvoice = (orderId, value) => {
        axios.post("/order/createInvoice", {
            orderId: orderId,
            price: value
        })
            .then((response) => {
                this.getAllOrders();
            })
    };

    getAllOrders = () => {
        axios.get("/order/listAllOrders")
            .then((response) => {
                this.setState((prevState) => ({
                    ...prevState,
                    orders:
                    response.data
                }))
            })
    };

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">

                    <div className="text-center header-text">
                        <h1>You're here as 'MANAGER'</h1>
                        <h4>You can make invoice and see all orders here!</h4>
                        <div>
                            <StatisticContainer allOrders={this.state.orders}/>
                            <ListOrders orders={this.state.orders}
                                        createInvoice={this.createInvoice}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}