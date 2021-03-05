/*
const app = require('../../index');
const supertest = require('supertest');
const bodyParser = require('body-parser');
const request = supertest.agent(app);

describe('Routing tests', () => {
  describe('Invalid routes error message', () => {
    it('get should return error message: Not found', done => {
      request
        .get('/fake-route')
        .expect(404)
        .then(response => {
          expect(response.status).toBe(404);
          expect(response.body.error).toHaveProperty(
            'message',
            'Not found'
          );
          done();
        })
        .catch(error => {'promise error'});
    });
  });
});
*/
test('true is true', () => {
  expect(true).toBe(true);
})
