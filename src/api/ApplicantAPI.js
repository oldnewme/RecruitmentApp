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
            const accessToken = Authorization.generateAccessToken(user);
            const refreshToken = Authorization.generateRefreshToken(user);

            if(nullRowChecker(applicant)) {

              
              res.json({userJSON, accessToken: accessToken, refreshToken: refreshToken })
            }
            else

              res.status(401).json({userJSON, accessToken: accessToken, refreshToken: refreshToken })
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

        const userAccessToken = req.headers['authorization'].split(" ")[1];
        const userLogInInfo = Authorization.getUserInfo(userAccessToken);  

        try{
          var applicant;
          var upDateApplicant;

          //If client logged in with username
          if(userLogInInfo.email === undefined) {
            const tempApplicant = await controller.ifApplicantExists(req.body.email, "email")
            if(tempApplicant !== undefined)
              throw new error("Entered email already taken")
            else {
              applicant = await controller.ifApplicantExists(userLogInInfo.username, 'username');
              upDateApplicant = await controller.upDateApplicant(applicant, req.body)
              res.status(200).json(upDateApplicant)
            }
          }

          //If client loggen in with email
          else if(userLogInInfo.username === undefined) {
            const tempApplicant = await controller.ifApplicantExists(req.body.username, "username")
            if(tempApplicant !== undefined)
              throw new Error("Entered username already taken")
            else {
              applicant = await controller.ifApplicantExists(userLogInInfo.email, 'email');
              upDateApplicant = await controller.upDateApplicant(applicant, req.body);
              res.status(200).json(upDateApplicant)
            }
          }

          else
            throw new Error("Unable to verify client")
          
        }
        catch(error){
          return res.status(401).json(this.errorHandler.handleError(updateRoute, error));
        }
      }
    );
  }
};

module.exports = ApplicantAPI;
