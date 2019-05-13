var express = require('express');
var router = express.Router();

var CustomerOrderService = require("./customerOrderService");
const customerOrderService = new CustomerOrderService();

const customerModel = require("./models/customer");
const shutterModel = require("./models/shutter");
const orderModel = require("./models/order");

router.get('/listAllOrders', (req, res) =>{
  customerOrderService.listAllOrders((orders)=>{
    res.status(200).send(orders);
  })
});

router.post('/listOwnOrders', (req, res) =>{
  /*if(req.body['name'] === undefined ||
      req.body['name'] === "" ||
      typeof req.body['name'] !== 'string'){
          res.status(414).send("Error(listOwnOrders): Name is invalid!")
          return
  }*/
  if(req.body['name'] === undefined){
      res.status(415).send(req.body)
      return
  }
  if(req.body['name'] === ""){
      res.status(416).send("Empty")
      return
  }
  if(typeof req.body['name'] !== 'string'){
      res.status(417).send("Not string")
      return
  }
  customerOrderService.listOwnOrders(req.body['name'], (orders)=>{
    res.status(200).send(orders);
  })
});

router.get('/listOpenOrders', (req, res) =>{
    customerOrderService.listOpenOrders((orders)=>{
        res.status(200).send(orders);
    })
});

router.post('/payOrder', (req, res) =>{
    if(req.body['id'] === undefined ||
        req.body['id'] === "" ||
        typeof req.body['id'] !== 'number'){
        res.status(414).send("Error(payOrder): Id is invalid!");
        return
    }
    customerOrderService.payOrder(req.body['id'],
        () => {res.status(200).send("Order paid successfully!")},
        (cause) => {res.status(400).send(cause)}
    )
});

router.post('/createInvoice', (req, res) =>{
    if(req.body['price'] === undefined ||
      req.body['price'] === "" ||
      typeof req.body['price'] !== 'number'){
      res.status(400).send("Error(createInvoice): Price is invalid!");
      return
    }
    if(req.body['orderId'] === undefined ||
        req.body['orderId'] === "" ||
        typeof req.body['orderId'] !== 'number'){
        res.status(400).send("Error(createInvoice): OrderId is invalid!");
        return
    }
    customerOrderService.createInvoice(
        req.body,
        () => {res.status(200).send("Invoice successfully created!")},
        (cause) => {res.status(400).send(cause)}
        )
});

router.post('/finishOrder', (req, res) =>{
    if(req.body['orderId'] === undefined ||
        req.body['orderId'] === "" ||
        typeof req.body['orderId'] !== 'number'){
        res.status(400).send("Error(finishOrder): OrderId is invalid!");
        return
    }
    customerOrderService.finishOrder(
        req.body['orderId'],
        () => {res.status(200).send("Order successfully finished!")},
        (cause) => {res.status(400).send(cause)}
    )
});

router.post('/addOrder', (req, res) =>{
    try{
        customerOrderService.countOrders((orders) => {
            order = new orderModel.OrderFromJson(req.body['order'], orders);
            customerOrderService.addOrder(
                order,
                () => {res.status(200).send("Order successfully added")},
                (cause) => {res.status(400).send(cause)}
            )
        });
    } catch (error){
        res.status(400).send(error);
        return;
    }
});

module.exports = {
    routes: router
};