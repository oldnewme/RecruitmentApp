const Sequelize = require('sequelize');
const Person = require('../model/Person');
const Role = require('../model/Role');
const Validators = require('../util/Validators');
const Availability = require('../model/Availability');
const Competence = require('../model/Competence');
const CompetenceProfile = require('../model/CompetenceProfile');

//try to move these elsewhere once tests work
const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '../..');
require('dotenv-safe').config({allowEmptyValues: true,
  path: path.join(APP_ROOT_DIR, '.env'),
  example: path.join(APP_ROOT_DIR, '.env.example')
});

/**
 * Class that handles interactions with database
 */
class ApplicationDAO {

  /**
   * Constructor that sets up connection to database and creates
   * the tables corresponding to users of the system
   */
  constructor() {
    this.database = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {host: process.env.DB_HOST, dialect: process.env.DB_DIALECT}
    );

    Role.createModel(this.database);
    Person.createModel(this.database);
    Availability.createModel(this.database);
    Competence.createModel(this.database);
    CompetenceProfile.createModel(this.database);
  }

  /**
  * Alters the ApplicationDAO's connection so that a different database is used.
  * This method is mainly for use in tests to prevent the main database from being affected.
  * @param {Sequelize} connection is a new Sequelize instance that provides new specifications.
  */
  setDatabase(connection) {
    this.database = connection;
    Role.createModel(connection);
    Person.createModel(connection);
    Availability.createModel(connection);
    Competence.createModel(connection);
    CompetenceProfile.createModel(connection);
  }

  async createTables() {
    await this.database.authenticate();
    await this.database.sync({force: false});
  }

  /**
   * Creates a user in the database
   * @param {PersonDTO} personDTO the object containing information about an Applicant
   * @param {Integer} roleId 
   * @returns 
   */
  async createPerson(personDTO, roleId) {
    const t = await this.database.transaction();

    try {
      Validators.isValidPassword(personDTO.password);
      Validators.isEmail(personDTO.email);
      Validators.isValidSSN(personDTO.ssn);
      Validators.isAlphaNumeric(personDTO.username);
      Validators.validName(personDTO.name)
      Validators.validSurname(personDTO.surname)
        const createdPerson = await Person.create({
          name: personDTO.name,
          surname: personDTO.surname,
          email: personDTO.email,
          ssn: personDTO.ssn,
          username: personDTO.username,
          password: personDTO.password},
          { transaction: t });

        await createdPerson.setRole(await Role.findByPk(roleId), { transaction: t });
        await t.commit();
        return createdPerson;

    } catch(error) {
      await t.rollback();
      throw error;
    }
  }

/**
* Removes the specified person from the Person table in the database.
* If the specified person does not exist, then nothing happens since the
* username will not have matched with any usernames in the table.
* @param {PersonDTO} personDTO is the person we want to remove
*/
  async destroyPerson(personDTO) {
    await Person.destroy({
      where: {
        username: personDTO.username
      }
    });
  }

  /**
  * return an person from the DB that matches with the specified username.
  * @param {String} authorizationString the username or email of the Person that is wanted.
  * @param {String} authorizationType a string representation of the username or email of the Person that is wanted.
  * @return the person object with details from the database
  * @throw an error if the user does not exist
  */
  async getPerson(authorizationString, authorizationType) {
    const t = await this.database.transaction();

    try {
      let whereClause = JSON.parse('{ "where": {' + '"' + authorizationType + '"' + ':' + '"' + authorizationString + '"' +'}}')
      let foundPerson = await Person.findOne(whereClause, { transaction: t });
      if(foundPerson) {
        await t.commit();
        return foundPerson;
      }
      else {
        throw new Error('The specified ' + authorizationType + ' does not exist.');
      }
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  /**
   * 
   * @param {*} authorizationString 
   * @param {*} authorizationType 
   * @returns 
   */
  async getPersonIfExists(authorizationString, authorizationType) {
    const t = await this.database.transaction();

    try {
      let whereClause = JSON.parse('{ "where": {' + '"' + authorizationType + '"' + ':' + '"' + authorizationString + '"' +'}}');
      let foundPerson = await Person.findOne(whereClause, { transaction: t });
      if(foundPerson){
        await t.commit();
        return foundPerson;
      }
      return undefined;
    } catch(error) {

    }
  }

  /**
  * @param {PersonDTO} personDTO the personDTO to update.
  * @param {JSON} upDatedValues a personDTO object or a JSON object with same attributes as a personDTO containing new values.
  */
  async updatePerson(personDTO, upDatedValues){
    let personToUpdate = await Person.findOne({where: {username: personDTO.username}});
    const t = await this.database.transaction();

    try {
      personToUpdate.name = upDatedValues.name;
      personToUpdate.surname = upDatedValues.surname;
      personToUpdate.ssn = upDatedValues.ssn;
      personToUpdate.username = upDatedValues.username;
      personToUpdate.email = upDatedValues.email;

      await personToUpdate.save({ transaction: t });
      t.commit();
      return personToUpdate;
    } catch(error) {
      t.rollback();
      throw error;
    }
  }

}

module.exports = ApplicationDAO;
