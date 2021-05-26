let Car = require('../models/Car');
let User = require('../models/User');
const dateFormat = require('dateformat');

async function getAll() {
    let allCars = await Car.find({}).lean();
    return allCars;
}

async function getOne(id) {
    let car = await Car.findById(id).lean();

    if (car.createdAt) {
        car.createdAt = dateFormat(car.createdAt, "dd-mm-yyyy");
    }

    return await car;
}

function deleteCar(id) {

    return Car.findByIdAndDelete(id);
}

function create(data) {

    let car = new Car(data);
    return car.save();
}

function editCar(data, id) {

    return Car.findByIdAndUpdate(id, data)
        .then(res => {


            return { res, status: 302 };
        }).catch(err => {
            err.status = 403;
            return err;
        })
}

async function likeCar(id, uId) {

    let carInfo = await Car.findById(id).lean()
    let userInfo = await User.findById(uId).lean();
    if (userInfo.likedCars) {
        userInfo.likedCars.push(id);
        await User.findByIdAndUpdate(uId, await userInfo);
    }

    delete carInfo._id;
    if (carInfo.likes >= 0) {

        carInfo.likes = Number(carInfo.likes) + 1;

    }

    return await Car.findByIdAndUpdate(id, await carInfo)
        .then(res => {

            return { res, status: 302 };
        }).catch(err => {
            console.log(err)
            err.status = 403;
            return err;
        })
}



module.exports = {
    getAll,
    getOne,
    create,
    deleteCar,
    editCar,
    likeCar
}