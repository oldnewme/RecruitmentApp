const path = require('path');
const Sequelize = require('sequelize');
const ApplicationDAO = require('../../src/integration/ApplicationDAO');
const PersonDTO = require('../../src/dto/PersonDTO');
const Person = require('../../src/model/Person');

let connection = null;
let applicationDAO = null;

const newPerson = new PersonDTO(
  {
    "name": "amoasdfng",
    "surame": "asdf",
    "email": "qqqqqq@meme.com",
    "ssn": "1970-01-01",
    "roleId": "2",
    "username": "asdfgsdd",
    "password": "password"
  }
);

const applicant = '2';
const recruiter = '1';

beforeAll(async () => {
  connection = await connectToDB();
  applicationDAO = new ApplicationDAO();
  applicationDAO.setDatabase(connection);
});

beforeEach(async () => {
  applicationDAO = new ApplicationDAO();
  applicationDAO.setDatabase(connection);
  await waitBecauseJestDoesNot();
  await applicationDAO.createTables();
  await applicationDAO.createPerson(newPerson, applicant);
});

afterEach(async () => {
  await applicationDAO.destroyPerson(newPerson);
});

afterAll(async () => {
  await applicationDAO.destroyPerson(newPerson);
  await connection.close();
});

describe('tests for getPerson', () => {
  test('existing person', async() => {
    const foundUser = await applicationDAO.getPerson(newPerson.username);
    expect(foundUser.username).toBe(newPerson.username);
    expect(foundUser.email).toBe(newPerson.email);
  });
  test('non-existing person', async() => {
    let personNotFoundErrorThrown = false;
    try{const foundUser = await applicationDAO.getPerson("NotImportant");}
    catch(error){
      personNotFoundErrorThrown = true;
    }
    expect(personNotFoundErrorThrown).toBe(true);
  });
});

const waitBecauseJestDoesNot = async () => {
  await sleep(100);
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const connectToDB = async () => {
  const APP_ROOT_DIR = path.join(__dirname, '../../');
  const result = require('dotenv-safe').config({allowEmptyValues: true,
    path: path.join(APP_ROOT_DIR, '.env'),
    example: path.join(APP_ROOT_DIR, '.env.example')
  });

  connection = new Sequelize(
    process.env.TEST_DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {host: process.env.DB_HOST, dialect: process.env.DB_DIALECT}
  );
  return connection;
};


/*
const clearDB = async () => {};
*/
