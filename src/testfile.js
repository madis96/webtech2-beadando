const assert = require('assert');
const customerModel = require('./models/customer');
const orderModel = require('./models/order');
const shutterModel = require('./models/shutter');

describe('Testing models!', () => {
    it('Testing customer model', () => {
        try {
            let customerData = new customerModel.CustomerFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(customer): Customer is undefined!")
        }
    });

    it('Testing order model', () => {
        try {
            let orderData = new orderModel.OrderFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(order): Order is undefined!")
        }
    });

    it('Testing shutter model', () => {
        try {
            let shutterData = new shutterModel.ShutterFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(shutter): Shutter is undefined!")
        }
    });
});