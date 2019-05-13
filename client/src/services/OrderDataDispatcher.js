import { Dispatcher } from 'flux'
import axios from "axios";
import OrderDataConstants from './OrderDataConstants'
import OrderDataStore from './OrderDataStore'

class OrderDataDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new OrderDataDispatcher();

dispatcher.register((data)=> {
    if(data.action.actionType !== OrderDataConstants.REFRESH_ORDER_DATAS){
        return;
    }

    axios.get("/order/listAllOrders")
        .then((response) => {
            OrderDataStore._orders.orderData = response.data;
            OrderDataStore.emitChange()
        })
});

export default dispatcher;
