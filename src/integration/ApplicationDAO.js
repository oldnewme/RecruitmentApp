const Sequelize = require('sequelize');
const Applicant = require('../model/Applicant');
const Recruiter = require('../model/Recruiter');
const Person = require('../model/Person');
const Role = require('../model/Role');
const validator = require('validator');
const bcrypt = require('bcrypt');
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
   * 
   * 
   */
    constructor(){
        this.database = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {host: process.env.DB_HOST, dialect: process.env.DB_DIALECT}
        );
        Applicant.createModel(this.database);
        Recruiter.createModel(this.database);
        Role.createModel(this.database);
        Person.createModel(this.database);
        Availability.createModel(this.database);
        Competence.createModel(this.database);
        CompetenceProfile.createModel(this.database);
    }

    setDatabase(connection){
      this.database = connection;
      Applicant.createModel(connection);
      Recruiter.createModel(connection);
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
   * @param {ApplicantDTO} applicantDTO the object containing information about an Applicant
   */
  async createUser(applicantDTO){

    if(validator.isEmail(applicantDTO.email)){
    return await Applicant.create({firstName: applicantDTO.firstName,
      lastName: applicantDTO.lastName,
      email: applicantDTO.email,
      dob: applicantDTO.dob,
      username: applicantDTO.username,
      password: /*bcrypt.hashSync(applicantDTO.password, 10)*/applicantDTO.password});
    } else{
      throw new Error('email is invalid');
    }

  }

  async upDateUser() {
    
  }

  async createPerson(personDTO, roleId){
   
    
    if(validator.isEmail(personDTO.email)){

      const createdPerson = await Person.create({name: personDTO.name,
                                                surname: personDTO.surname,
                                                email: personDTO.email,
                                                ssn: personDTO.ssn,
                                                username: personDTO.username,
                                                password: personDTO.password});
      await createdPerson.setRole(await Role.findByPk(roleId));

     
      
      return createdPerson;

    } else{
      
      throw new Error('email is invalid');
    }

  }

  async destroyPerson(personDTO){
    await Person.destroy({
      where: {
        username: personDTO.username
      }
    });
  }

/**
* return an applicant from the DB that matches with the specified username.
* @param {Username} username the username of the Applicant that is wanted
* @return the applicant object with details from the database
* @throw an error if the user does not exist
*/
  async getApplicant(authorizationString, authorizationType){
    let whereClause = JSON.parse('{ "where": {' + '"' + authorizationType + '"' + ':' + '"' + authorizationString + '"' +'}}')
    let foundApplicant = await Applicant.findOne(whereClause);
    if(foundApplicant){
      return foundApplicant;
    }
    else {
      throw new Error('The specified ' + authorizationType + ' does not exist.');
    }
  }

/**
* return an person from the DB that matches with the specified username.
* @param {Username} username the username of the Person that is wanted
* @return the person object with details from the database
* @throw an error if the user does not exist
*/
async getPerson(authorizationString, authorizationType){
  let whereClause = JSON.parse('{ "where": {' + '"' + authorizationType + '"' + ':' + '"' + authorizationString + '"' +'}}')
  let foundPerson = await Person.findOne(whereClause);
  if(foundPerson){
    return foundPerson;
  }
  else {
    throw new Error('The specified ' + authorizationType + ' does not exist.');
  }
}

async getApplicantIfExists(authorizationString, authorizationType) {
  let whereClause = JSON.parse('{ "where": {' + '"' + authorizationType + '"' + ':' + '"' + authorizationString + '"' +'}}')
  let foundApplicant = await Applicant.findOne(whereClause);
  if(foundApplicant){
    return foundApplicant;
  }
  return undefined;
}

async getPersonIfExists(authorizationString, authorizationType) {
  let whereClause = JSON.parse('{ "where": {' + '"' + authorizationType + '"' + ':' + '"' + authorizationString + '"' +'}}')
  let foundPerson = await Person.findOne(whereClause);
  if(foundPerson){
    return foundPerson;
  }
  return undefined;
}

/**
 * Uppdates the applicant data 
 * @param {ApplicantDTO} applicantDTO contains applicant data 
 * @param {JSON} upDatedValues updated applicant data 
 * @returns 
 */
  async updateApplicant(applicant, upDatedValues){
    //let applicant = await Applicant.findOne({where: {username: applicantDTO.username}})

    applicant.firstName = upDatedValues.firstName;
    applicant.lastName = upDatedValues.lastName;
    applicant.dob = upDatedValues.dob;
    applicant.username = upDatedValues.username;
    applicant.email = upDatedValues.email;
    
    await applicant.save();
    return applicant;

  }

  async updatePerson(person, upDatedValues){
    //let applicant = await Applicant.findOne({where: {username: applicantDTO.username}})
  
    person.name = upDatedValues.name;
    person.surname = upDatedValues.surname;
    person.ssn = upDatedValues.ssn;
    person.username = upDatedValues.username;
    person.email = upDatedValues.email;
    
    await person.save();
    return person;
  
  }

}

module.exports = ApplicationDAO;
