import EventEmitter from 'events'

class OrderCartStore extends EventEmitter{

    _orders = [];

    getItems() {
        return this._orders;
    }

    getItemsAsOrder() {
        return this._orders.item;
    }

    emitChange(){
        this.emit('orders-change')
    }

    addChangeListener(callback){
        this.addListener('orders-change',callback)
    }

    removeChangeListener(callback){
        this.removeListener('orders-change',callback);
    }
}

export default new OrderCartStore();
