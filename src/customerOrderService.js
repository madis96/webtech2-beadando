function CustomerOrderService(customerOrderDAO) {
    winston = require('winston');
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'logfiles/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logfiles/combined.log' })
        ]
    });

    if(customerOrderDAO !== undefined) {
        this.customerOrderDAO = customerOrderDAO;
    } else {
        this.customerOrderDAO = require('./customerOrderDAO');
    }
}

CustomerOrderService.prototype.listAllOrders = function(callback){
    this.customerOrderDAO.listAllOrders((orders) =>{
    logger.info(`${orders.length} orders were found!`);
    callback(orders)
  })
};

CustomerOrderService.prototype.listOwnOrders = function(customerName, callback){
    this.customerOrderDAO.listOwnOrders(customerName, (orders) => {
    logger.info(`${orders.length} orders were found!`);
    callback(orders)
  })
};

CustomerOrderService.prototype.listOpenOrders = function(callback){
    this.customerOrderDAO.listOpenOrders((orders) => {
      logger.info(`${orders.length} orders were found!`);
      callback(orders)
  })
};

CustomerOrderService.prototype.payOrder = function(orderId, success, error){
    this.customerOrderDAO.payOrder(
        {
            "orderId": orderId,
            "lastModified": new Date().toISOString()},
        () => {success()});
};

CustomerOrderService.prototype.createInvoice = function(order, success, error){
    order['lastModified'] = new Date().toISOString();
    this.customerOrderDAO.createInvoice(order, () => {success()});
};

CustomerOrderService.prototype.finishOrder = function(orderId, success, error){
    this.customerOrderDAO.finishOrder(
        {
            "orderId": orderId,
            "lastModified": new Date().toISOString()},
        () => {success()});
};

CustomerOrderService.prototype.addOrder = function(order, successCallback, errorCallback){
    order['orderDate'] = new Date().toISOString();
    order['lastModified'] = new Date().toISOString();
    this.customerOrderDAO.addOrder(order, (createdId) => {
        logger.info("createOrder: Order successfully created");
        successCallback(createdId)
    }, (error) => {
        logger.error("Error in createOrder, cause: " + error);
        errorCallback(error);
    })
};

CustomerOrderService.prototype.countOrders = function(callback){
    this.customerOrderDAO.listAllOrders((orders) =>{
        logger.info(`${orders.length} orders were found!`);
        callback(orders.length)
    })
};



module.exports = CustomerOrderService;
