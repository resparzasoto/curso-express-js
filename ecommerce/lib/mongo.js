
const MongoClient = require('mongodb').MongoClient;

const { config } = require('../config');

const uri = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.name}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) {
                    return reject(err);
                }

                console.log('Connected successfully to mongo');
                return resolve(this.client);
            });
        });
    }

    getAll(collection, query) {
        return this.connect()
            .then(client => {
                return client.db(config.db.name).collection(collection).find(query).toArray();
            });
    }
}

module.exports = MongoLib;
