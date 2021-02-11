const Sequelize = require('sequelize');
const Applicant = require('../model/Applicant');
const Recruiter = require('../model/Recruiter');

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
  
  async signup(applicantDTO){
    await Applicant.create({firstName: applicantDTO.firstName,
                                              lastName: applicantDTO.lastName, 
                                              email: applicantDTO.email,
                                              dob: applicantDTO.dob,
                                              username: applicantDTO.username,
                                              password: applicantDTO.password});
  }
}

module.exports = ApplicationDAO;