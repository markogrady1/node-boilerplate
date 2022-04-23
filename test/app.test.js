// /* eslint-disable no-useless-escape */
const supertest = require('supertest');
const app = require('../bin/server');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GET  /healthcheck', () => {
  it('should GET back a health check response', async () => {
    const res = await supertest(app).get('/healthcheck');
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.status).toEqual('OK');
  });
});
