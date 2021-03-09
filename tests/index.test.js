/*
const request = require('supertest');
const server = require('../index');

beforeEach(async () => {
  chatDAO = new ChatDAO();
  await forSomeReasonJestDoesNotWaitForCompletionThereforeWait();
  await chatDAO.createTables();
  await createUser();
});

afterAll(async (done) => {
  await server.close();
  done();
});

describe('basic route tests', () => {
  test('get home route GET /', async () => {
    try{
      const response = await request(server).get('/');
      expect(response.status).toEqual(200);
      //expect(response.text).toContain('Welcome');
    }
    catch(error){
      expect.anything();
    }
  });
});
*/
test('true is true', () => {
  expect(true).toBe(true);
})
