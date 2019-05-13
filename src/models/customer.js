function Customer(name, address){
    if(name === undefined || typeof name !== 'string' || name === ""){
        throw "Error(customer): Name is invalid!";
    }
    if(address === undefined || typeof address !== 'string' || address === ""){
        throw "Error(customer): Address is invalid!";
    }

    this.name = name;
    this.address = address;
}

function CustomerFromJson(customer){
    if(customer === undefined){
        throw "Error(customer): Customer is undefined!";
    }

    return new Customer(customer.name, customer.address);
}

module.exports = {
    "Customer": Customer,
    "CustomerFromJson": CustomerFromJson
};