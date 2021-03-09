const express = require('express');
const controller = require('../controller/Controller');
const ApplicantDTO = require('../dto/ApplicantDTO');
const { update } = require('../model/Role');
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
    const updateRoute = '/update';
    const protectedRoute = '/protected';
    const nullCheckerString = '09695060848347644085735346228334752515337078300310219385669578588';

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

          var applicant;
          var userJSON;
          var authorizationType;

          if(req.body.email === '') {
            authorizationType = 'username';
            applicant = await controller.getApplicant(req.body.username, authorizationType);
            userJSON = {username:req.body.username};
          }
          else {
            authorizationType = 'email';
            applicant = await controller.getApplicant(req.body.email, authorizationType);
            userJSON = {email:req.body.email};
          }

          if(applicant.password == req.body.password){
            const user = userJSON;

            if(nullRowChecker(applicant)) {
              const accessToken = Authorization.generateAccessToken(user);
              const refreshToken = Authorization.generateRefreshToken(user);
              
              res.json({userJSON, accessToken: accessToken, refreshToken: refreshToken })
            }
            else 
              throw new Error('Incomplete')
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

    /**
     * Checks if any of the JSON elements are equal to
     * a pretermined string which marks a null value
     * in the database.
     * @param {JSON} applicant 
     * @returns Returns true if no match is found, false
     * otherwise.
     */
    const nullRowChecker = (applicant) => {
      if(applicant.firstName === nullCheckerString)
        return false;
      else if(applicant.lastName === nullCheckerString)
        return false;
      else if(applicant.email === nullCheckerString)
        return false;
      else if(applicant.dob === nullCheckerString)
        return false;
      else if(applicant.username === nullCheckerString)
        return false;
      else 
        return true;
    }

      /**
       * The following route enables the client to
       * update null values in the database
       */
      this.router.post(updateRoute, async (req, res) => {

        try{
          var applicant;
          var authorizationType;
          applicant = await controller.ifApplicantExists(req.body.username, 'username');
          if(applicant === undefined)
            applicant = await controller.ifApplicantExists(req.body.email, 'email');

          // if(req.body.email === 'tempString') {
          //   authorizationType = 'username';
          //   applicant = await controller.getApplicant(req.body.username, authorizationType);
          
          // }
          // else {
          //   authorizationType = 'email';
          //   applicant = await controller.getApplicant(req.body.email, authorizationType);
            
          // }

          if(applicant.password == req.body.password){
            const updatedApplicant = await controller.upDateApplicant(applicant, req.body)
            return res.status(200).json(updatedApplicant)
          }
          else{
            throw new Error('Invalid password');
         }
        }
        catch(error){
          return res.status(401).json(this.errorHandler.handleError(updateRoute, error));
        }
      }
    );
  }
};

module.exports = ApplicantAPI;
