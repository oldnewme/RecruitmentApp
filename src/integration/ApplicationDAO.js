const Sequelize = require('sequelize');
const Applicant = require('../model/Applicant');
const Recruiter = require('../model/Recruiter');
const validator = require('validator');
const bcrypt = require('bcrypt');

/**
 * Class that handles interactions with database
 */
class ApplicationDAO {
  /**
   * Constructor that sets up connection to database and creates
   * the tables corresponding to users of the system
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
  
  /**
   * Gets an applicant from the database given a username
   * @param {Username} username the username of the Applicant that is wanted
   */
  async getApplicant(username){
    return await Applicant.findOne({ where: { username: username}})
  }

}

module.exports = ApplicationDAO;
