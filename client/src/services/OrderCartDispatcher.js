import {Dispatcher} from 'flux'
import OrderCartConstants from './OrderCartConstants'
import OrderCartStore from './OrderCartStore'

class OrderCartDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new OrderCartDispatcher();
dispatcher.register((data)=>{
    if(data.action.actionType === OrderCartConstants.INSERT_ITEM){
            OrderCartStore._orders.push({
                item : data.action.payload,
                quantity : 1
            });
        OrderCartStore.emitChange()
    }
});

dispatcher.register((data) => {
    if(data.action.actionType === OrderCartConstants.REMOVE_SINGLE_ITEM){
        var index = data.action.payload.id;
        OrderCartStore._orders[index].quantity -= 1;
        OrderCartStore._orders = OrderCartStore._orders.filter((element) => {return element.quantity > 0});
        OrderCartStore.emitChange()
    }
});

dispatcher.register((data) => {
    if(data.action.actionType === OrderCartConstants.REMOVE_ALL_ITEMS){
        OrderCartStore._orders = [];
        OrderCartStore.emitChange()
    }
});

export default dispatcher