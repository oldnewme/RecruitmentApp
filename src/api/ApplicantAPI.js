const express = require('express');
const { errorFromList } = require('verror');
const controller = require('../controller/Controller');
const ApplicantDTO = require('../dto/ApplicantDTO');
const Applicant = require('../model/Applicant');

class ApplicantAPI {
  constructor() {
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

  async registerHandler() {
    /**
     * route to create a new account
     */
    this.router.post('/signup',
      async (req, res) => {
        try {
        const applicantDTO = new ApplicantDTO(req.body);
        await controller.signup(applicantDTO);
        return res.status(200).json(applicantDTO)
        } catch (error) {
          console.log('api layer')
          res.status(401).json({error:error.message})
        }
      });

    this.router.post('/login', async (req, res, next) => {
      // validate
      // if !valid res.status(400).json(error)

      const { email, password } = req.body;
      Applicant.findAll({
        where:{
          email
        }
      }).then(applicant => {
        if(!user.length){
          errors.email = 'User was not found';
          return res.status(404).json(errors);
        }
        
      })

      

      const user = controller.login(req.body.username, req.body.password);

      res.status(200).json({ msg: user.username });
    });


  }

}

module.exports = ApplicantAPI;