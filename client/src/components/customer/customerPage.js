import React, { Component } from "react";
import { LoginForm } from "./loginForm"
import { MainPage } from "./mainPage"

export class CustomerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customerData: undefined
        };

    }

    setCustomer = (customerData) => {
        this.setState({customerData: customerData});
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">

                    <div className="text-center header-text">
                        <h1>You're here as 'CUSTOMER'</h1>
                        <h4>You can 'login' and order a new shutter here!</h4>
                        {(this.state.customerData === undefined)
                        ? <div><h6>You're not logged in</h6>
                                <LoginForm setCustomer={this.setCustomer} />
                            </div>
                        : <div><h6>You're logged in</h6>
                                <MainPage customerData={this.state.customerData} />
                            </div>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}