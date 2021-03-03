const express = require('express');
const controller = require('../controller/Controller');
const PersonDTO = require('../dto/PersonDTO');
const Authorization = require('./auth/Authorization');
const ErrorHandler = require('./error/errorHandler');


/**
 * Class represents the REST API with endpoints related to Persons
 */
class PersonAPI {
  constructor() {
    this.router = express.Router();
    this.errorHandler = new ErrorHandler();
  }

  /**
   * @return {string} The URL path corresponding to this api.
   */
  get path() {
    return PersonAPI.PERSON_API_PATH;
  }

  /**
   * @return {string} The URL paths corresponding to the Person requesthandler.
   */
  static get PERSON_API_PATH() {
    return '/api/person';
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
        const personDTO = new PersonDTO(req.body);
        const role = req.body.roleId;
        await controller.signupPerson(personDTO, role);
        return res.status(200).json(personDTO)
        } catch (error) {
          res.status(401).json(this.errorHandler.handleError(signupRoute, error));
        }
      });



       /**
       * Route symbolizes a restricted path to prove that authorization works
       */
      this.router.get(protectedRoute, Authorization.authenticateToken, Authorization.authenticateRole(1), (req, res) =>{
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
          const person = await controller.getPerson(req.body.username);

          if(person.password == req.body.password){
            const user = {username:req.body.username}
            const accessToken = Authorization.generateAccessToken(user);
            const refreshToken = Authorization.generateRefreshToken(user);
            
            res.json({username:person.username, accessToken: accessToken, refreshToken: refreshToken })
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

module.exports = PersonAPI;
