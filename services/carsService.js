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



module.exports = {
    getAll,
    getOne,
    create,
    deleteCar,
    editCar
}