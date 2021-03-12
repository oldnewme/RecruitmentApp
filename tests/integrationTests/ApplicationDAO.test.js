const path = require('path');
const Sequelize = require('sequelize');
const ApplicationDAO = require('../../src/integration/ApplicationDAO');
const PersonDTO = require('../../src/dto/PersonDTO');
const Person = require('../../src/model/Person');

let connection = null;
let applicationDAO = null;

const newPerson = new PersonDTO({
  "name": "Among",
  "surname": "Us",
  "email": "sus@meme.com",
  "ssn": "19700101",
  "roleId": 2,
  "username": "amongus",
  "password": "password"
});
const badEmail = new PersonDTO({
  "name": "A",
  "surname": "B",
  "email": "invalid",
  "ssn": "19700101",
  "roleId": 2,
  "username": "badMailPerson",
  "password": "password"
});
const sameUser = new PersonDTO({

});
const sameEmail = new PersonDTO({
  "name": "C",
  "surname": "D",
  "email": "sus@meme.com",
  "ssn": "19700101",
  "roleId": 2,
  "username": "sameEmailPerson",
  "password": "password"

});
const validPerson = new PersonDTO({
  "name": "Peter",
  "surname": "Griffin",
  "email": "peter@perhaps.com",
  "ssn": "19650823",
  "roleId": 2,
  "username": "peter",
  "password": "password"
});

const applicant = 2;
const recruiter = 1;

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
    let foundUser = await applicationDAO.getPerson(newPerson.username, "username");
    expect(foundUser.username).toBe(newPerson.username);
    foundUser = await applicationDAO.getPerson(newPerson.email, "email");
    expect(foundUser.email).toBe(newPerson.email);
  });
  test('non-existing person', async() => {
    let personNotFound = false;
    try{
      const foundUser = await applicationDAO.getPerson("NotImportant", "username");
      const foundEmail = await applicationDAO.getPerson("fake@mail.com", "email");
    }
    catch(error){
      personNotFound = true;
    }
    expect(personNotFound).toBe(true);
  });
  test('invalid authorizationType', async() => {
    let invalidAuthType = false;
    try{await applicationDAO.getPerson(newPerson.username, "fakeType");}
    catch(error){invalidAuthType = true;}
    expect(invalidAuthType).toBe(true);
  });
});

describe('tests for createPerson', () => {
  test('invalid email format', async() => {
    let caughtError = false;
    try{
      caughtError = await applicationDAO.createPerson(badEmail, badEmail.roleId);
      await applicationDAO.destroyPerson(badEmail);
    }
    catch(error){
      caughtError = true;
    }
    expect(caughtError).toBe(true);
  });
  test('duplicate email', async() => {
    let duplicateEmail = false;
    try{
      duplicateEmail = await applicationDAO.createPerson(sameEmail, sameEmail.roleId);
      await applicationDAO.destroyPerson(sameEmail);
    }
    catch(error){
      duplicateEmail = true;
    }
    expect(duplicateEmail).toBe(true);
  });
  test('duplicate username', async() => {
    let duplicateUsername = false;
    try{
      duplicateUsername = await applicationDAO.createPerson(sameUser, sameUser.roleId);
      await applicationDAO.destroyPerson(sameUser);
    }
    catch(error){
      duplicateUsername = true;
    }
    expect(duplicateUsername).toBe(true);
  });
  test('add another person', async() => {
    let successfullyAdded = false;
    try{
      await applicationDAO.createPerson(validPerson, validPerson.roleId);
      successfullyAdded = true;
      await applicationDAO.destroyPerson(validPerson);
    }
    catch(error){
      successfullyAdded = false;
    }
    expect(successfullyAdded).toBe(true);
  });
});

describe('tests for destroyPerson', () => {
  test('check that person was removed', async() => {
    let successfullyRemoved = false;
    await applicationDAO.destroyPerson(newPerson);
    try{
      await applicationDAO.getPerson(newPerson);
    }
    catch(error){
      successfullyRemoved = true;
    }
    expect(successfullyRemoved).toBe(true);
  });
  test('remove non-existing person', async() => {
    let destroyFailed = false;
    try{
      await applicationDAO.destroyPerson(validPerson);
    }
    catch(error){
      destroyFailed = true;
    }
    expect(destroyFailed).toBe(false);
  });
});

describe('tests for getPersonIfExists', () => {

  test('test for person that exists via username', async() => {
    let foundPerson = await applicationDAO.getPersonIfExists(newPerson.username, "username");
    expect(foundPerson).toBeDefined();
  });
});

describe('tests for updatePerson', () => {
  test('check that values are updated', async() => {
    let updatedPerson = await applicationDAO.updatePerson(newPerson, validPerson);
    applicationDAO.destroyPerson(updatedPerson);
    expect(updatedPerson.username).toBe(validPerson.username);
    expect(updatedPerson.email).toBe(validPerson.email);
  });
});
const waitBecauseJestDoesNot = async() => {
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
