import React, { Component } from "react";

export class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: {
                name: ""
            },
            error: {
                customer: {
                    name: undefined
                }
            }
        };
    }

    handleNameChange = (event) => {
        const newValue = event.target.value;
        this.setState((prevState) => ({
                ...prevState,
                customer: {
                    ...prevState.customer,
                    name: newValue
                }
            }),
            () => this.validateName()
        )
    };

    validateName = () => {
        if(this.state.customer.name === "") {
            this.setState((prevState) => (
                {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        customer: {
                            ...prevState.error.customer,
                            name: true
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
                            name: false
                        }
                    }
                }
            ));

            return true;
        }
    };

    validateForm = () => {
        let isValid = true;

        isValid = this.validateName() && isValid;

        return isValid;
    };

    saveForm = (event) => {
        event.preventDefault();
        if(this.validateForm()) {
            this.props.setCustomer(this.state.customer);
        }
    };

    render() {
        return (

            <form className="form-horizontal"  onSubmit={(e) => this.saveForm(e)}>
                <div
                    className={ this.state.error.customer.name === true
                        ? "form-group has-error"
                        : this.state.error.customer.name === false
                            ? "form-group has-success"
                            : "form-group"
                    }
                >
                    <div>
                        <label className="control-label col-md-5">Name:</label>
                        <div className="col-md-2">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={this.state.customer.name}
                                onChange={this.handleNameChange}
                                className={"form-control"}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
        )
    }
}