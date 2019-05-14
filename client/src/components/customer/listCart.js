import React, { Component } from "react";
import OrderCartStore from "./../../services/OrderCartStore";
import OrderCartActions from "./../../services/OrderCartActions";

export class ListCart  extends Component{
    submitOrder = () => {
            this.props.addOrder({
                "customer": {
                    "name": this.props.user.name,
                    "address": this.props.user.address
                },
                "shutters": this.props.shutters
            });
            OrderCartActions.removeAllItems();
            this.props.setShutters();
    };

    handleRemove = (index) => {
        OrderCartActions.removeSingleItem({"id" : index});
        this.props.removeFunction(index);
    };



    render(){
        return (
            <div className="shoppingCart">
                <div className="shoppingCartTitle">{this.props.user.name} - {this.props.user.address}</div>
                <div className="shoppingCartBody">
                    {this.props.cart.map((element, i) => {
                    return(
                        <div className="shoppingCartElements row" key={i}>
                            <div className="shopppingCartElement col-md-1">
                                {i+1}
                            </div>
                            <div className="shopppingCartElement col-md-6">
                                {element.item.width} x {element.item.height}
                            </div>
                            <div className="shopppingCartElement col-md-3">
                                <button onClick={()=> {this.handleRemove(i)}}>Remove</button>
                            </div>
                        </div>
                    )})
                    }
                </div>
                <div className="shoppingCartFooter">
                    <div className="col-md-12">
                        <button onClick={()=> {this.submitOrder()}}>Submit</button>
                    </div>
                </div>
            </div>)
    }
}