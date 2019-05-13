const MongoClient = require('mongodb').MongoClient;

const dbName =  'orderstation';
const url = 'mongodb://172.21.0.10:27017"';
const collection = {orders: "orders"};


var databaseConnection;

const getDatabaseConnection = async () => {
    if(databaseConnection !== undefined) {
        return databaseConnection;
    } else {
        try {
            const client = await MongoClient.connect(
                url,
                options={useNewUrlParser: true, auto_reconnect: true}
            );

            databaseConnection = client.db(dbName);
            console.log(`Connected to database successfully`)
        } catch (error) {
            console.error(`Failed to connect! Error: ${error.stack}`)
        }

        return databaseConnection;
    }
};

connectToDatabase = async () => {
    await getDatabaseConnection();
};

module.exports = {
    getDatabaseConnection: getDatabaseConnection,
    connectToDatabase: connectToDatabase,
    dbName : dbName,
    url: url,
    collections: collection
};
