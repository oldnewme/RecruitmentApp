const express = require('express');
const router = express.Router();
const controller = require('../controller/Controller');
const ApplicantDTO = require('../dto/ApplicantDTO');

class ApplicantAPI{
    constructor(){
        this.router = express.Router();
    }

  /**
   * @return {string} The URL paths handled by this request handler.
   */
  get path() {
    return ApplicantAPI.APPLICANT_API_PATH;
  }

  /**
   * @return {string} The URL paths handled by this request handler.
   */
  static get APPLICANT_API_PATH() {
    return '/api/applicant';
  }

  async registerHandler(){
    /**
     * route to create a new account
     */
    this.router.post('/signup', (req, res) => {
        const applicantDTO = new ApplicantDTO(req.body.firstName, req.body.lastName, req.body.email, 
            req.body.dob, req.body.username, req.body.password);
        controller.signup(applicantDTO);
        res.status(200).json({msg:'Account created successfully'});
    });
    
    this.router.post('/login', (req, res) => {
        controller.login(req.body.username, req.body.password);
        res.status(200).json({msg:'user is logged in'});
    });

  }

}

module.exports = ApplicantAPI;