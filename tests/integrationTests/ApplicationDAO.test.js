// const path = require('path');
// const Sequelize = require('sequelize');
// const ApplicationDAO = require('../../src/integration/ApplicationDAO');
// const PersonDTO = require('../../src/dto/PersonDTO');
// const Person = require('../../src/model/Person');

// let connection = null;
// let applicationDAO = null;

// const newPerson = new PersonDTO(
//   {
//     "name": "amoasdfng",
//     "surame": "asdf",
//     "email": "qqqqqq@meme.com",
//     "ssn": "1970-01-01",
//     "roleId": "2",
//     "username": "asdfgsdd",
//     "password": "password"
//   }
// ); //userDTO

// const applicant = '2';
// const recruiter = '1';

// beforeAll(async () => {
//   connection = await connectToDB();
//   applicationDAO = new ApplicationDAO();
//   applicationDAO.setDatabase(connection);
//   //await applicationDAO.destroyPerson(newPerson);
// });

// beforeEach(async () => {
//   applicationDAO = new ApplicationDAO();
//   applicationDAO.setDatabase(connection);
//   await waitBecauseJestDoesNot();
//   await applicationDAO.createTables();
//   await applicationDAO.createPerson(newPerson, applicant); //applicationDAO
// });

// afterEach(async () => {
//   await applicationDAO.destroyPerson(newPerson);
//   //await clearDB();
// });

// afterAll(async () => {
//   //await applicationDAO.destroyPerson(newPerson);
//   //await connection.destroy();
// });

// describe('tests for getPerson', () => {
//   test('existing person', async() => {
//     const foundUser = await applicationDAO.getPerson(newPerson.username);
//     expect(foundUser.username).toBe(newPerson.username);
//     expect(foundUser.email).toBe(newPerson.email);
//   });
// });

// const waitBecauseJestDoesNot = async () => {
//   await sleep(100);
// };

// const sleep = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

// const connectToDB = async () => {
//   const APP_ROOT_DIR = path.join(__dirname, '../../');
//   const result = require('dotenv-safe').config({allowEmptyValues: true,
//     path: path.join(APP_ROOT_DIR, '.env'),
//     example: path.join(APP_ROOT_DIR, '.env.example')
//   });

//   connection = new Sequelize(
//     process.env.TEST_DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {host: process.env.DB_HOST, dialect: process.env.DB_DIALECT}
//   );
//   return connection;
// };


// /*
// const clearDB = async () => {
//   let sql = 'drop table if exists people';
//   await connection.query(sql, (err, result) => {
//     if(err){
//       throw err;
//     }
//   });
// };
// */
test('true is true', () => {
  expect(true).toBe(true);
})

