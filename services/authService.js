const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async({ email, username, password }) => {

    try {

        let salt = await bcrypt.genSalt(SALT_ROUNDS);
        password = await bcrypt.hash(password, salt);
        let user = await new User({ email, username, password });
        return await user.save();
    } catch (error) {
        throw error;
    }


}

const login = async({ email, password }) => {


    let user = await User.findOne({ "email": email }).lean();
    if (!user) throw new Error('There is no such a user!');


    let areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) throw new Error('Invalid password');

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET)
    return await token;


}

const isLiked = async(uId, carId) => {

    let userCars = await User.findById(uId).lean();

    let isLiked = false;

    if (userCars.likedCars) {
        userCars.likedCars.forEach(el => {
            if (el == carId) {
                isLiked = true;
            }
        })
    }

    return await isLiked;
}



module.exports = {
    login,
    register,
    isLiked
}