// src/app.js
const express = require('express');
const { passengerRoutes, driverRoutes } = require('./routes');
const { carService } = require('./services');

const app = express();
app.use(express.json());
app.use('/passengers', passengerRoutes);
app.use('/drivers', driverRoutes);

app.post('/cars', async (req, res) => {
    const { model, color, license_plate } = req.body;
const { type, message } = await carService.createCar(model, color, license_plate);

if (type) return res.status(400).json({ message });
res.status(201).json({ message });
});

module.exports = app;
