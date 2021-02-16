const express = require('express');
const controller = require('../controller/Controller');
const RecruiterDTO = require('../dto/RecruiterDTO');

class RecruiterAPI{
    constructor(){
        this.router = express.Router();
    }

  /**
   * @return {string} The URL paths handled by this request handler.
   */
  get path() {
    return RecruiterAPI.APPLICANT_API_PATH;
  }

  /**
   * @return {string} The URL paths handled by this request handler.
   */
  static get APPLICANT_API_PATH() {
    return '/api/recruiter';
  }

  async registerHandler(){
    
    this.router.post('/login', (req, res) => {
        controller.login(req.body.username, req.body.password);
        res.status(200).json({msg:req.body.username, password:req.body.password});
    });

  }

}

module.exports = RecruiterAPI;