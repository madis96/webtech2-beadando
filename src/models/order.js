var customerModel = require("./customer");

function Parts(noShutters){
    var max = noShutters * 50;
    var min = noShutters * 10;
    this.board = Math.floor(Math.random() * (+max - +min)) + +min;
    this.connector = Math.floor(Math.random() * (+max - +min)) + +min;
    this.rope = 2;
}

function Order(customer, shutter, lastId){
    if(customer === undefined){
        throw "Error(order): Customer is undefined!";
    }
    if(shutter === undefined){
        throw "Error(order): Shutter is undefined!";
    }
    if(shutter.length <= 0) {
        throw "Error(shutter): must be 1 or more shutters";
    }

    this.id = lastId+1;
    this.customer = new customerModel.CustomerFromJson(customer);
    this.shutter = shutter;
    this.parts = new Parts(shutter.length);
    this.isFinished = false;
}

function OrderFromJson(order, lastId){
    if(order === undefined){
        throw "Error(order): Order is undefined!";
    }

    return new Order(
        order.customer,
        order.shutters,
        lastId
    )
}

module.exports = {
    "Order": Order,
    "OrderFromJson": OrderFromJson
};