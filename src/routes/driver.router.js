// src/routers/driver.router.js
// src/routers/drivers.router.js
const express = require('express');
const { driverService } = require('../services');
const driverController = require('../controllers/driver.controller');
const validateDrivers = require('../middlewares/validateDrivers');

const router = express.Router();

router.get('/open/travels', driverController.openTravel);

router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriversById);
router.post('/', validateDrivers, driverController.createDriver);

router.put('/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.travelAssign({
    travelId,
    driverId,
  });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

router.put('/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.startTravel({
    travelId,
    driverId,
  });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

router.put('/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.endTravel({
    travelId,
    driverId,
  });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

module.exports = router;
