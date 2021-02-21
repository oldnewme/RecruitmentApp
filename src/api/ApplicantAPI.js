const express = require('express');
const controller = require('../controller/Controller');
const ApplicantDTO = require('../dto/ApplicantDTO');
const Authorization = require('./auth/Authorization');

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

      this.router.get('/protected', Authorization.authenticateToken, (req, res) =>{
        res.json('Allowed')
      })

      this.router.post('/login', async (req, res) => {
        const applicant = await controller.getApplicant(req.body.username);
        if(!applicant){
          return res.status(400).send('Cannot find user');
        }
          if(applicant.password == req.body.password){
            const user = {username:req.body.username}
            const accessToken = Authorization.generateAccessToken(user);
            const refreshToken = Authorization.generateRefreshToken(user);

            res.json({username:applicant.username, accessToken: accessToken, refreshToken: refreshToken })
          } else{
            res.status(401).send('incorrect password')
          }
      });
  }
};

module.exports = ApplicantAPI;