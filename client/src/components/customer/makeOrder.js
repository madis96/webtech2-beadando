import React, { Component } from "react";
import OrderCartActions from './../../services/OrderCartActions'
import OrderCartStore from "../../services/OrderCartStore";
import {ListCart} from "./listCart"

export class MakeOrder extends Component {

constructor(props) {
    super(props);

    this.onOrderCartChange = this.onOrderCartChange.bind(this);

    this.state = {
        shutters:[],
        cart:[],
        order: {
            customer: {
                name: this.props.customerData.name,
                address: this.props.customerData.address
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
                hegiht: undefined
            }
        }
    };

}

onOrderCartChange(){
    this.setState({cart : OrderCartStore.getItems()});
}

componentDidMount(){
    OrderCartStore.addChangeListener(this.onOrderCartChange)
}

componentWillUnmount(){
    OrderCartStore.removeChangeListener(this.onOrderCartChange)
}

    handleWidthChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => ({
            ...prevState,
            order:{
                ...prevState.order,
                shutter:{
                    ...prevState.order.shutter,
                    width: parseInt(newValue)
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
                    height: parseInt(newValue)
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

    validateForm = () => {
        let isValid = true;

        isValid = this.validateWidth() && isValid;
        isValid = this.validateHeight() && isValid;

        return isValid;
    };

    removeFunction = (index) => {

        this.state.shutters.splice(index, 1);
    };

    saveForm = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            OrderCartActions.insertItem(this.state.order.shutter);
            this.addNewShutter(this.state.order.shutter);
            //this.props.addOrder(this.state.order);
            this.setState({
                order: {
                    customer: {
                        name: this.props.customerData.name,
                        address: this.props.customerData.address
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

    addNewShutter = (data) => {
        this.setState((prevState) => ({
            ...prevState,
            shutters: [
                ...prevState.shutters,
                data
            ]
        }));
    };

    setShutters = () => {
        this.setState(this.state.shutters = [])
    };


render() {
    return (
            <div>
                <ListCart
                    cart={this.state.cart}
                    user={this.props.customerData}
                    addOrder={this.props.addOrder}
                    shutters={this.state.shutters}
                    setShutters={this.setShutters}
                    removeFunction={this.removeFunction}
                />
                <div className="formContainer">
                    <form className="form-horizontal"  onSubmit={(e) => this.saveForm(e)}>
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
                            <button type="submit" className="btn btn-primary">Add to cart</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
    )
}
}