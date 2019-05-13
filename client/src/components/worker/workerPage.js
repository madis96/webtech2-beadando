import React, { Component } from "react";
import axios from "axios";
import {ListOrders} from "./listOrders";
import OrderDataStore from "../../services/OrderDataStore";
import OrderDataActions from "../../services/OrderDataActions";

export class WorkerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            selectedOrder: 0
        };

    }

    componentDidMount() {
        axios.get("/order/listOpenOrders")
            .then((response) => {
                this.setState((prevState) => ({
                    ...prevState,
                    orders: response.data
                }))
            })
    }

    finishOrder = (orderId) => {
        axios.post("/order/finishOrder", {
            orderId: orderId
        })
            .then((response) => {
                axios.get("/order/listOpenOrders")
                    .then((response) => {
                        this.setState((prevState) => ({
                            ...prevState,
                            orders: response.data
                        }))
                    })
            })
    };

    setSelectedOrder = (orderId) =>{
        if(orderId === this.state.selectedOrder){
            this.setState({selectedOrder : 0});
            return;
        }
        this.setState({selectedOrder : orderId});
    };


    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">

                    <div className="text-center header-text">
                        <h1>You're here as 'WORKER'</h1>
                        <h4>You can finish jobs and see unfinished job's parts here!</h4>
                        <div>
                            <ListOrders orders={this.state.orders}
                                        finishOrder={this.finishOrder}
                                        selectedOrder={this.state.selectedOrder}
                                        setSelectedOrder={this.setSelectedOrder}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}