const assert = require('assert');
const getDatabaseConnection = require('./Database').getDatabaseConnection;

//const url = 'mongodb://localhost:27017';

const dbName = 'orderstation';
const orderCollection = 'orders';

async function listOrders(parameters, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(orderCollection);

    collection.find(parameters).toArray((err, orders) => {
        try {
            assert.equal(null, err, err);

            successCallback(orders)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

function listAllOrders(callback){
    listOrders({},(result) => {callback(result)})
}

function listOwnOrders(customerName, callback){
    listOrders({"customer.name" : customerName}, (result) => callback(result))
}

function listOpenOrders(callback){
    listOrders({"shutter.isFinished":{$ne: true}}, (result) => {callback(result)})
}

async function payOrder(order, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(orderCollection);

    collection.updateOne(
        {"id": order.orderId},
        {$set: {"shutter.isPaid": true, "lastModified" : order.lastModified}},
        (err, response) => {
            try {
                assert.equal(null, err, err);

                successCallback()
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

async function createInvoice(order, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(orderCollection);

    collection.updateOne(
        {"id" : order.orderId},
        {$set: {"shutter.price" : order.price, "lastModified" : order.lastModified}},
        (err, response) => {
            try {
                assert.equal(null, err, err);
                assert.equal(1, response.matchedCount, "Could not find order");
                assert.equal(1, response.modifiedCount, "Could not update order (maybe already updated?)");

                successCallback()
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

async function finishOrder(order, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(orderCollection);

    collection.updateOne(
        {"id" : order.orderId},
        {$set: {"shutter.isFinished" : true, "lastModified" : order.lastModified}},
        (err, response) => {
            try {
                assert.equal(null, err, err);
                assert.equal(1, response.matchedCount, "Could not find order");
                assert.equal(1, response.modifiedCount, "Could not update order (maybe already updated?)");

                successCallback()
            } catch (error) {
                errorCallback("" + error);
            }
        }
    )
}

async function addOrder(order, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(orderCollection);

    collection.insertOne(order, (err,response) => {
        try {
            assert.equal(null, err, err);

            successCallback(response.insertedId)
        } catch (error) {
            errorCallback("" + error);
        }
    })
}

module.exports = {
    "listAllOrders" : listAllOrders,
    "listOwnOrders" : listOwnOrders,
    "listOpenOrders" : listOpenOrders,
    "payOrder" : payOrder,
    "createInvoice" : createInvoice,
    "finishOrder" : finishOrder,
    "addOrder" : addOrder
};