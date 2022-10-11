// src/controllers/driver.controller.js
const { driverService } = require('../services');
const errorMap = require('../utils/errorMap');

const openTravel = async (_req, res) => {
  const { type, message } = await driverService.getWaitingDriverTravels();

  // Linha de código responsável por gerar uma resposta em caso de erro no
  // processamento do componente de software da camada `Service`
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getAllDrivers = async (_req, res) => {
  const { type, message } = await driverService.getDrivers();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const createDriver = async (req, res) => {
  const { name, carIds } = req.body;

  const { type, message } = await driverService.createDriver(name, carIds);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const getDriversById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await driverService.getDriversByid(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

module.exports = {
  openTravel,
  getAllDrivers,
  createDriver,
  getDriversById,
};
