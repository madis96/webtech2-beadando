import React, { Component } from "react";
import axios from "axios";
import { ListOrders } from "./listOrders";
import { MakeOrder } from "./makeOrder";

export class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ownOrders: []
        };
    }

    componentDidMount() {
        axios.post("/order/listOwnOrders", {
            "name": this.props.customerData.name
        })
            .then((response) => {
                this.setState((prevState) => ({
                    ...prevState,
                    ownOrders:
                        response.data
                }))
            })

    }

    addOrder = (order) => {
        var data = {
            order: {
                ...order,
                customer: order.customer,
                shutter: {
                    width: parseInt(order.shutter.width),
                    height: parseInt(order.shutter.height)
                }
            }
        };

        axios.post("/order/addOrder", data)
            .then((response) => {

                axios.post("/order/listOwnOrders", {
                    "name": this.props.customerData.name
                })
                    .then((response) => {
                        this.setState((prevState) => ({
                            ...prevState,
                            ownOrders:
                            response.data
                        }))
                    })
            })
    };

    payOrder = (orderId) => {
        axios.post("/order/payOrder",{
            id: orderId
        })
            .then((response) => {

                axios.post("/order/listOwnOrders", {
                    "name": this.props.customerData.name
                })
                    .then((response) => {
                        this.setState((prevState) => ({
                            ...prevState,
                            ownOrders:
                            response.data
                        }))
                    })
            })
    };

    render() {
        return (
            <React.Fragment>
                <MakeOrder customerData={this.props.customerData} addOrder={this.addOrder}/>
                <ListOrders customerData={this.props.customerData} ownOrders={this.state.ownOrders} payOrder={this.payOrder}/>
            </React.Fragment>
        )
    }


}