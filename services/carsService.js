let Car = require('../models/Car');

async function getAll() {
    let allCars = await Car.find({}).lean();
    return allCars;
}

async function getOne(id) {
    let car = await Car.findById(id).lean();

    if (car.createdAt) {
        let month = '' + car.createdAt.getMonth() + 1;
        let day = '' + car.createdAt.getDate();
        let year = car.createdAt.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        car.createdAt = [year, month, day].join('-');
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