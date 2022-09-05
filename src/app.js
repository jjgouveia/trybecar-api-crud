const express = require('express');
const { passengerService, driverService } = require('./services');

const app = express();

app.use(express.json());

app.post('/passengers/:passengerId/request/travel', async (req, res) => {
  const { passengerId } = req.params;
  const { startingAddress, endingAddress, waypoints } = req.body;

  const travel = await passengerService.requestTravel(
    passengerId, 
    startingAddress, 
    endingAddress, 
    waypoints,
  );
  
  res.status(201).json(travel);
});

app.get('/drivers/open/travels', async (_req, res) => {
  const result = await driverService.getWaitingDriverTravels();
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.travelAssign({ travelId, driverId });
  
  if (type && type.endsWith('NOT_FOUND')) return res.status(404).json(message);
  if (type === 'TRAVEL_CONFLICT') return res.status(409).json(message);
  if (type === 'INVALID_VALUE') return res.status(422).json(message);
  
  return res.status(200).json(message);
});

app.put('/drivers/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.startTravel({ travelId, driverId });
  if (type && type.endsWith('NOT_FOUND')) return res.status(404).json(message);
  if (type === 'TRAVEL_CONFLICT') return res.status(409).json(message);
  if (type === 'INVALID_VALUE') return res.status(422).json(message);
  
  return res.status(200).json(message);
});

app.put('/drivers/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.endTravel({ travelId, driverId });
  
  if (type && type.endsWith('NOT_FOUND')) return res.status(404).json(message);
  if (type === 'TRAVEL_CONFLICT') return res.status(409).json(message);
  if (type === 'INVALID_VALUE') return res.status(422).json(message);
  
  return res.status(200).json(message);
});

module.exports = app;
