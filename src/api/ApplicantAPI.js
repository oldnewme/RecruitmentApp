const express = require('express');
const controller = require('../controller/Controller');
const ApplicantDTO = require('../dto/ApplicantDTO');
const Authorization = require('./auth/Authorization');
const ErrorHandler = require('./error/errorHandler');


/**
 * Class represents the REST API with endpoints related to applicants
 */
class ApplicantAPI {
  constructor() {
    this.router = express.Router();
    this.errorHandler = new ErrorHandler();
  }

  /**
   * @return {string} The URL path corresponding to this api.
   */
  get path() {
    return ApplicantAPI.APPLICANT_API_PATH;
  }

  /**
   * @return {string} The URL paths corresponding to the applicant requesthandler.
   */
  static get APPLICANT_API_PATH() {
    return '/api/applicant';
  }
  /**
   * Used to register handlers defined below
   */
  async registerHandler() {


    const signupRoute = '/signup';
    const loginRoute = '/login';
    const protectedRoute = '/protected';

    /**
     * Route creates a user given som parameters in the request body
     * return: 200: The user was sucessfully created
     *         401: user was not sucessfully created
     */
    this.router.post(signupRoute,
      async (req, res) => {
        try {
        const applicantDTO = new ApplicantDTO(req.body);
        await controller.signup(applicantDTO);
        return res.status(200).json(applicantDTO)
        } catch (error) {
          res.status(401).json(this.errorHandler.handleError(signupRoute, error));
        }
      });



       /**
       * Route symbolizes a restricted path to prove that authorization works
       */
      this.router.get(protectedRoute, Authorization.authenticateToken, (req, res) =>{
        res.json('Allowed')
      })

      /**
       * Route logs in a user given som credentials and returns 
       * username, accesstoken and refreshtoken
       * return 401: The user was not authenticated.
       *        
       */
      this.router.post(loginRoute, async (req, res) => {

        try{
          const applicant = await controller.getApplicant(req.body.username);

          if(applicant.password == req.body.password){
            const user = {username:req.body.username}
            const accessToken = Authorization.generateAccessToken(user);
            const refreshToken = Authorization.generateRefreshToken(user);
            
            res.json({username:applicant.username, accessToken: accessToken, refreshToken: refreshToken })
          }
          else{
            throw new Error('Invalid password');
         }
        }

        catch(error){
          return res.status(401).json(this.errorHandler.handleError(loginRoute, error));
        }
      }
    );
  }
};

module.exports = ApplicantAPI;
