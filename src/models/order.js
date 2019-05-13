var customerModel = require("./customer");
var shutterModel = require("./shutter");

function Order(customer, shutter, lastId){
    if(customer === undefined){
        throw "Error(order): Customer is undefined!";
    }
    if(shutter === undefined){
        throw "Error(order): Shutter is undefined!";
    }

    this.id = lastId+1;
    this.customer = new customerModel.CustomerFromJson(customer);
    this.shutter = new shutterModel.ShutterFromJson(shutter);
}

function OrderFromJson(order, lastId){
    if(order === undefined){
        throw "Error(order): Order is undefined!";
    }

    return new Order(
        order.customer,
        order.shutter,
        lastId
    )
}

module.exports = {
    "Order": Order,
    "OrderFromJson": OrderFromJson
};