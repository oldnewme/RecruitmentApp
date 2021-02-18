const Sequelize = require('sequelize');
const Applicant = require('../model/Applicant');
const Recruiter = require('../model/Recruiter');
const validator = require('validator');

class ApplicationDAO {
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
  
  async createUser(applicantDTO){
    if(validator.isEmail(applicantDTO.email)){
      await Applicant.create({firstName: applicantDTO.firstName,
      lastName: applicantDTO.lastName, 
      email: applicantDTO.email,
      dob: applicantDTO.dob,
      username: applicantDTO.username,
      password: applicantDTO.password}).catch(err => {
        console.log('err.name ' + err.name);
        console.log('err.message ' +err.message);
        console.log('err.errors ' + err.errors);
        err.errors.map(e => console.log("hora "+e.message))
        throw new Error(err.errors[0].message)
      })
    } else{
      throw new Error('email is invalid')
    }

  }
  
}

module.exports = ApplicationDAO;