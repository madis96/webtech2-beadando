import EventEmitter from 'events'

class OrderDataStore extends EventEmitter{

    _orders = {
        orderData: []
    };

    emitChange(){
        this.emit('orders-change');
    }

    addChangeListener(callback){
        this.addListener('orders-change', callback);
    }

    removeChangeListener(callback){
        this.removeListener('orders-change', callback);
    }
}

export default new OrderDataStore();