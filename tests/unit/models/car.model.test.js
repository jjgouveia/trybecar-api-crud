const { expect } = require('chai');
const Sinon = require('sinon');
const { carModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { newCar, carList } = require('./mocks/car.model.mock');

describe('Verifica a camada model de Car', function () {
    describe('Verifica as informações referentes a um carro na plataforma', function () {
        afterEach(function () {
            Sinon.restore();
        });
        it('Verifica se é possível inserir um novo carro', async function () {
            Sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
            const request = await carModel.insert(newCar);
            expect(request).to.equal(1);
        });
        it('Verifica se é possível localizar um carro através do ID', async function () {
            Sinon.stub(connection, 'execute').resolves([[carList[3]]]);
            const request = await carModel.findById(4);
            expect(request).to.be.deep.equal(carList[3]);
        });
    });
});