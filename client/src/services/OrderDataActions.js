import OrderDataConstants from './OrderDataConstants'
import OrderDataDispatcher from './OrderDataDispatcher'

class OrderDataActions{

    refreshOrderList() {
        OrderDataDispatcher.handleViewAction({
            actionType : OrderDataConstants.REFRESH_ORDER_DATAS
        });
    }
}

export default new OrderDataActions();