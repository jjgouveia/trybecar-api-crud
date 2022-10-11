const { carModel } = require('../models');
const { validateNewCar } = require('./validations/validationsInputValues');

const createCar = async (model, color, licensePlate) => {
const error = validateNewCar(model, color, licensePlate);
if (error.type) return error;

const request = await carModel.insert({ model, color, licensePlate });
return { type: null, message: request };
};

module.exports = {
    createCar,
};