const { addRequestTravelSchema,
  addPassengerSchema, idSchema, addCarSchema, addDriverSchema } = require('./schemas');
const { travelModel, driverModel, carModel } = require('../../models');

const validateRequestTravelSchema = (passengerId, startingAddress, endingAddress, waypoints) => {
  const { error } = addRequestTravelSchema
    .validate({ passengerId, startingAddress, endingAddress, waypoints });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateInputValues = async ({ travelId, driverId }) => {
  /* Valida se travelId existe */
  const travel = await travelModel.findById(travelId);
  if (!travel) return { type: 'TRAVEL_NOT_FOUND', message: 'travel id not found' };

  /* Valida se driverId existe */
  const driver = await driverModel.findById(driverId);
  if (!driver) return { type: 'DRIVER_NOT_FOUND', message: 'driver id not found' };

  return { type: null, message: '' };
};

const validateAlreadyDriver = async (travelId) => {
  const travel = await travelModel.findById(travelId);

  if (travel && travel.driverId) {
    return { type: 'TRAVEL_CONFLICT', message: 'travel already assigned' };
  }

  return { type: null, message: '' };
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewPassenger = (name, email, phone) => {
  const { error } = addPassengerSchema
    .validate({ name, email, phone });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewCar = (model, color, licensePlate) => {
  const { error } = addCarSchema
  .validate({ model, color, licensePlate });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewDriver = async (name, carIds) => {
  const { error } = addDriverSchema
    .validate({ name, carIds });

  if (error) return { type: 'INVALID_VALUE', message: error.message };
  if (carIds) {
    // chamamos `carModel.findById` em cada um dos ids para buscar os carros na DB

    // quando um carro não existe, sua Promise retorna `undefined`

    // `Promise.all` aguarda todas as Promises retornarem

    // e retorna a array de resultados para `cars`

    const cars = await Promise.all(

      carIds.map(async (carId) => carModel.findById(carId)),

    );

    const someCarIsMissing = cars.some((car) => car === undefined);

    if (someCarIsMissing) return { type: 'CAR_NOT_FOUND', message: 'Some car is not found' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateRequestTravelSchema,
  validateInputValues,
  validateAlreadyDriver,
  validateId,
  validateNewPassenger,
  validateNewCar,
  validateNewDriver,
};
