import React, { Component } from "react";

export class StatisticContainer extends Component {

    calculateTotalIncome = () => {
        var totalIncome = 0;
        // eslint-disable-next-line
        this.props.allOrders.map((order, i) => {
            if(order.price > 0)
            {
                totalIncome = totalIncome + order.price;
            }
        });
        return this.makePriceFromInt(totalIncome);
    };

    calculateCurrentlyPaid = () => {
        var currentlyPaid = 0;
        // eslint-disable-next-line
        this.props.allOrders.map((order, i) => {
            if(order.isPaid)
            {
                currentlyPaid = currentlyPaid + order.price;
            }
        });
        return this.makePriceFromInt(currentlyPaid);
    };

    calculatePendingIncome = () => {
        var pendingIncome = 0;
        // eslint-disable-next-line
        this.props.allOrders.map((order, i) => {
            if(!order.isPaid && order.price > 0)
            {
                pendingIncome = pendingIncome + order.price;
            }
        });
        return this.makePriceFromInt(pendingIncome);
    };

    getBiggestPrice = () => {
        return this.makePriceFromInt(this.biggestPrice());
    };

    biggestPrice = () => {
        var biggestPrice = 0;
        // eslint-disable-next-line
        this.props.allOrders.map((order, i) => {
            if(order.price > biggestPrice)
            {
                biggestPrice = order.price;
            }
        });
        return biggestPrice;
    };

    getLowestPrice = () => {
        return this.makePriceFromInt(this.lowestPrice());
    };

    lowestPrice = () => {
        var lowestPrice = this.biggestPrice();
        // eslint-disable-next-line
        this.props.allOrders.map((order, i) => {
            if(order.price < lowestPrice)
            {
                lowestPrice = order.price;
            }
        });
        return lowestPrice;
    };

    countFinishedOrders = () => {
        var finishedOrders = 0;
        // eslint-disable-next-line
        this.props.allOrders.map((order, i) => {
            if(order.isFinished)
            {
                finishedOrders = finishedOrders + 1;
            }
        });
        return finishedOrders;
    };

    countPaidOrders = () => {
        var paidOrders = 0;
        // eslint-disable-next-line
        this.props.allOrders.map((order, i) => {
            if(order.isPaid)
            {
                paidOrders = paidOrders + 1;
            }
        });
        return paidOrders;
    };

    makePriceFromInt = (value) => {
        return value.toLocaleString()  + " HUF";
    };



    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="statisticContainer">
                        <div className="row statisticTitle">
                            Statistic about jobs/orders
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">All orders:</div>
                            <div className="col-md-6">{this.props.allOrders.length}</div>
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Paid orders:</div>
                            <div className="col-md-6">{this.countPaidOrders()}</div>
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Unpaid orders:</div>
                            <div className="col-md-6">{this.props.allOrders.length - this.countPaidOrders()}</div>
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Finished orders:</div>
                            <div className="col-md-6">{this.countFinishedOrders()}</div>
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Unfinished orders:</div>
                            <div className="col-md-6">{this.props.allOrders.length - this.countFinishedOrders()}</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="statisticContainer">
                        <div className="row statisticTitle">
                            Statistic about price
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Total income:</div>
                            <div className="col-md-6">{this.calculateTotalIncome()}</div>
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Currently paid:</div>
                            <div className="col-md-6">{this.calculateCurrentlyPaid()}</div>
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Pending income:</div>
                            <div className="col-md-6">{this.calculatePendingIncome()}</div>
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Biggest price:</div>
                            <div className="col-md-6">{this.getBiggestPrice()}</div>
                        </div>
                        <div className="row statisticElement">
                            <div className="col-md-6">Lowest price:</div>
                            <div className="col-md-6">{this.getLowestPrice()}</div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}