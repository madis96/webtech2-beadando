import React, { Component } from "react";

export class MakeOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            order:{
                customer: {
                    name: this.props.customerData.name,
                    address: ""
                },
                shutter: {
                    width : 0,
                    height: 0
                }
            },
            error:{
                customer: {
                    name: undefined,
                    address: undefined
                },
                shutter: {
                    width : undefined,
                    height: undefined
                }
            }
        };
    }

    handleAddressChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => ({
                ...prevState,
                order: {
                    ...prevState.order,
                    customer: {
                        ...prevState.order.customer,
                        address: newValue
                    }
                }
            })
        )
    };

    handleWidthChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => ({
            ...prevState,
            order:{
                ...prevState.order,
                shutter:{
                    ...prevState.order.shutter,
                    width: newValue
                }
            }
        }))
    };

    handleHeightChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => ({
            ...prevState,
            order:{
                ...prevState.order,
                shutter:{
                    ...prevState.order.shutter,
                    height: newValue
                }
            }
        }))
    };

    validateWidth = () => {
        if(this.state.order.shutter.width < 1) {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        shutter: {
                            ...prevState.error.shutter,
                            width: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        shutter: {
                            ...prevState.error.shutter,
                            width: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateHeight = () => {
        if(this.state.order.shutter.height < 1) {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        shutter: {
                            ...prevState.error.shutter,
                            height: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        shutter: {
                            ...prevState.error.shutter,
                            height: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateAddress = () => {
        if(this.state.order.customer.address === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            address: true
                        }
                    }
                }
            ));

            return false;
        } else {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            address: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateForm = () => {
        let isValid = true;

        isValid = this.validateAddress() && isValid;
        isValid = this.validateWidth() && isValid;
        isValid = this.validateHeight() && isValid;

        return isValid;
    };

    saveForm = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            this.props.addOrder(this.state.order);
            this.setState({
                order: {
                    customer: {
                        name: this.props.customerData.name,
                        address: ""
                    },
                    shutter: {
                        width: 0,
                        height: 0
                    }
                },
                error: {
                    customer: {
                        name: undefined,
                        address: undefined
                    },
                    shutter: {
                        width: undefined,
                        height: undefined
                    }
                }
            })
        }
    };



    render() {
        return (
            <div className="formContainer">
            <form className="form-horizontal"  onSubmit={(e) => this.saveForm(e)}>
                <div
                    className={ this.state.error.customer.address === true
                        ? "form-group has-error"
                        : this.state.error.customer.address === false
                            ? "form-group has-success"
                            : "form-group"
                    }
                >
                    <div>
                        <label className="control-label col-md-5">Address:</label>
                        <div className="col-md-4">
                            <input
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Enter your address"
                                value={this.state.order.customer.address}
                                onChange={this.handleAddressChange}
                                className={"form-control"}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={ this.state.error.shutter.width === true
                        ? "form-group has-error"
                        : this.state.error.shutter.width === false
                            ? "form-group has-success"
                            : "form-group"
                    }
                >
                    <div>
                        <label className="control-label col-md-5">Width:</label>
                        <div className="col-md-4">
                            <input
                                id="width"
                                type="number"
                                name="width"
                                value={this.state.order.shutter.width}
                                onChange={this.handleWidthChange}
                                className="form-control"
                                />
                        </div>
                    </div>
                </div>

                <div
                    className={ this.state.error.shutter.height === true
                        ? "form-group has-error"
                        : this.state.error.shutter.height === false
                            ? "form-group has-success"
                            : "form-group"
                    }
                >
                    <div>
                        <label className="control-label col-md-5">Height:</label>
                        <div className="col-md-4">
                            <input
                                id="height"
                                type="number"
                                name="height"
                                value={this.state.order.shutter.height}
                                onChange={this.handleHeightChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary">Add order</button>
                    </div>
                </div>
            </form>
            </div>
        )
    }
}