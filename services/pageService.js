let Car = require('../models/Car');

async function getAll() {
    let allCars = await Car.find({}).lean();
    return allCars;
}

function getOne(id) {

    return Car.findById(id).lean();
}

function create(data) {

    let car = new Car(data);
    return car.save();
}


module.exports = {
    getAll,
    getOne,
    create,
}