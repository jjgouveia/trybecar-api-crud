const { expect } = require('chai');
const Sinon = require('sinon');
const { driverCarModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

describe('Driver_Car Model', function () {
    describe('Cadastra o relacionamento das pessoas motoristas com os carros', function () {
       before(async function () {
        const res = { insertId: 1 };

        Sinon.stub(connection, 'execute').resolves([res]);
       });

       after(async function () {
        Sinon.restore();
       });
        it('com Sucesso', async function () {
            const mockData = {
                driverId: 3,
                carId: 1,
            };

            const expected = 1;

            const response = await driverCarModel.insert(mockData);

            expect(response).to.equal(expected);
        });
    });
});