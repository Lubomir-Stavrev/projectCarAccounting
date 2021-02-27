let Car = require('../models/Car');
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
    console.log(id)
    return Car.findByIdAndDelete(id);
}

function create(data) {
    console.log(data);
    let car = new Car(data);
    return car.save();
}


module.exports = {
    getAll,
    getOne,
    create,
    deleteCar
}