'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('test base routes', () => {
  it('it should GET back a health check response', async () => {
    const res = await chai.request(app).get('/healthcheck');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equal('OK');
    expect(res.body).to.haveOwnProperty('version');
  });
});
