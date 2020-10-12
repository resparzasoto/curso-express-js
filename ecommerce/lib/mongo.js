const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:mongo');

const { config } = require('../config');

const uri = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.name}?retryWrites=true&w=majority`;

class MongoLib {
    static connection = null;

    constructor() {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if(!MongoLib.connection)
        {
            try {
                await this.client.connect();
                debug('Connected successfully to mongo');
                MongoLib.connection = this.client;
            } catch (error) {
                return error;
            }
        }
        return MongoLib.connection;
    }

    async getAll(collection, query) {
        try {
            const client = await this.connect();
            return client.db(config.db.name).collection(collection).find(query).toArray();
        } catch (error) {
            return error;
        }
    }

    async get(collection, id) {
        try {
            const client = await this.connect();
            return client.db(config.db.name).collection(collection).findOne({ _id: ObjectId(id) });
        } catch (error) {
            return error;
        }
    }

    async create(collection, data) {
        try {
            const client = await this.connect();
            const result = await client.db(config.db.name).collection(collection).insertOne(data);
            return result.insertedId;
        } catch (error) {
            return error;
        }
    }

    async update(collection, id, data) {
        try {
            const client = await this.connect();
            const result = client.db(config.db.name).collection(collection).updateOne({ _id: ObjectId(id)}, { $set: data }, { upsert: true });
            return result.upsertedId || id;
        } catch (error) {
            return error;
        }
    }

    async delete(collection, id) {
        try {
            const client = await this.connect();
            await client.db(config.db.name).collection(collection).deleteOne({ _id: ObjectId(id) });
            return id;
        } catch (error) {
            return error;
        }
    }
}

module.exports = MongoLib;
