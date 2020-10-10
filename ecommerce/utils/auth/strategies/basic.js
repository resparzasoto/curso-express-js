const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const MongoLib = require('../../../lib/mongo');

passport.use(
    new BasicStrategy(async function(username, password, cb) {
        const mongDB = new MongoLib();

        try {
            const [user] = await mongDB.getAll('users', { username });

            if (!user) {
                return cb(Boom.unauthorized(), false);
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return cb(Boom.unauthorized(), false);
            }

            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    })
)
