import OrderCartConstants from './OrderCartConstants'
import OrderCartDispatcher from "./OrderCartDispatcher";

class OrderCartActions {

    insertItem(item){
        OrderCartDispatcher.handleViewAction({
            actionType : OrderCartConstants.INSERT_ITEM,
            payload : item
        });
    }

    removeSingleItem(item){
        OrderCartDispatcher.handleViewAction({
            actionType : OrderCartConstants.REMOVE_SINGLE_ITEM,
            payload : item
        })
    }

    removeAllItems(){
        OrderCartDispatcher.handleViewAction({
            actionType : OrderCartConstants.REMOVE_ALL_ITEMS
        })
    }

}

export default new OrderCartActions();