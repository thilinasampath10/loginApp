const config = require('config.json');
const jwt = require('jsonwebtoken');
const barest = require('bcryptjs');
const db = require('../connectors/db');
const User = db.User1;

module.exports = {
    authenticate,
    register,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });

    if (user && barest.compareSync(password, user.hash)) {
        console.log(user);
        const token = jwt.sign({ sub: user.id }, "123", { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}


// async function getById(id) {
//     return await User.findById(id);
// }

async function register(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = barest.hashSync(userParam.password, 10);
    }


    // save user
    await user.save();

    return {
        ...user.toJSON(),
    }
}


