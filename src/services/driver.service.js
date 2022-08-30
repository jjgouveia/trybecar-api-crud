const { travelModel } = require('../models');
const {
  validateTripSchema,
  validateInputValues,
  validateAlreadyDriver,
} = require('./validations/validationsInputValues');

const WAITING_DRIVER = 1;
const DRIVER_ON_THE_WAY = 2;
const TRAVEL_IN_PROGRESS = 3;
const TRAVEL_FINISHED = 4;

const getWaitingDriverTravels = async () => {
  const [result] = await travelModel.findAllByStatus(WAITING_DRIVER);
  return { type: null, message: result }; 
};

/* Aceitar a viagem; */
const travelAssign = async ({ travelId, driverId }) => {
  /* Validar se travelId e driverId são ids VÁLIDOS */
  let error = validateTripSchema({ travelId, driverId });
  if (error.type) return error;

  /* Validar se travelId e driverId são ids EXISTENTES */
  error = await validateInputValues({ travelId, driverId });
  if (error.type) return error;

  /* Validar se o motorista que esta tentando pegar uma viagem, não esta em outra */
  error = await validateAlreadyDriver(travelId);
  if (error.type) return error;

  /* Alterar o status de "aguardando motorista" para "motorista a caminho" */
  await travelModel.updateById(travelId, { driverId, DRIVER_ON_THE_WAY });
  /* Retornar os dados gravados no banco, para fins de relatório em tela */
  const result = await travelModel.findById(travelId);
  return { type: null, message: result }; 
};

/* Iniciar a viagem; */
const startTravel = async ({ travelId, driverId }) => {
  /* Validar se travelId e driverId são ids VÁLIDOS */
  let error = validateTripSchema({ travelId, driverId });
  if (error.type) return error;

  /* Validar se travelId e driverId são ids EXISTENTES */
  error = await validateInputValues({ travelId, driverId });
  if (error.type) return error;

  /* Alterar o status de "motorista a caminho" para "viagem em andamento" */
  await travelModel.updateById(travelId, { driverId, TRAVEL_IN_PROGRESS });

  /* Retornar os dados gravados no banco, para fins de relatório em tela */
  const result = await travelModel.findById(travelId);
  return { type: null, message: result }; 
};

/* Encerrar a viagem; */
const endTravel = async ({ travelId, driverId }) => {
  /* Validar se travelId e driverId são ids VÁLIDOS */
  let error = validateTripSchema({ travelId, driverId });
  if (error.type) return error;

  /* Validar se travelId e driverId são ids EXISTENTES */
  error = await validateInputValues({ travelId, driverId });
  if (error.type) return error;

  /* Alterar o status de "viagem em andamento" para "viagem finalizada" */
  await travelModel.updateById(travelId, { driverId, TRAVEL_FINISHED });

  /* Retornar os dados gravados no banco, para fins de relatório em tela */
  const result = await travelModel.findById(travelId);
  return { type: null, message: result }; 
};

module.exports = {
  travelAssign,
  startTravel,
  endTravel,
  getWaitingDriverTravels,
};