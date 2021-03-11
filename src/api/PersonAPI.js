const express = require('express');
const controller = require('../controller/Controller');
const PersonDTO = require('../dto/PersonDTO');
const Authorization = require('./auth/Authorization');
const ErrorHandler = require('./error/errorHandler');
const Validators = require('../util/Validators');


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
    const nullCheckerString = '09695060848347644085735346228334752515337078300310219385669578588';
    const updateRoute = '/update';


    /**
     * Route creates a user given som parameters in the request body
     * return: 200: The user was sucessfully created
     *         401: user was not sucessfully created
     */
    this.router.post(signupRoute,
      async (req, res) => {
        try {
          
        const personDTO = new PersonDTO(req.body);
        console.log(personDTO)
        console.log(req.body.roleId)
        const role = req.body.roleId;

        Validators.isValidPassword(personDTO.password);
        Validators.isEmail(personDTO.email);
        Validators.isValidSSN(personDTO.ssn);
        Validators.isAlphaNumeric(personDTO.username);
        Validators.validName(personDTO.name, personDTO.surname)

        await controller.signupPerson(personDTO, role);
        return res.status(200).json(personDTO)
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
       * username or email, accesstoken and refreshtoken
       * return 401: The user was not authenticated.
       *        
       */
      this.router.post(loginRoute, async (req, res) => {

        try {

          var person;
          var userJSON;

          if(req.body.email === '') {
            person = await controller.getPerson(req.body.username, "username");
            userJSON = {username:req.body.username};
          }
          else {
            person = await controller.getPerson(req.body.email, "email");
            userJSON = {email:req.body.email};
          }

          if(person.password == req.body.password){
            const user = userJSON
            const accessToken = Authorization.generateAccessToken(user);
            const refreshToken = Authorization.generateRefreshToken(user);

            if(nullRowChecker(person)) 
              res.json({userJSON, accessToken: accessToken, refreshToken: refreshToken })

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
    const nullRowChecker = (person) => {
      if(person.name === nullCheckerString)
        return false;
      else if(person.surname === nullCheckerString)
        return false;
      else if(person.ssn === nullCheckerString)
        return false;
      else if(person.email === nullCheckerString)
        return false;
      else if(person.username === nullCheckerString)
        return false;
      else 
        return true;
    }

    /**
     * The following route enables the client to
     * update null values in the database
     */
    this.router.post(updateRoute, async (req, res) => {
      console.log(req.headers['authorization'])
      const userAccessToken = req.headers['authorization'].split(" ")[1];
      const userLogInInfo = Authorization.getUserInfo(userAccessToken);
      console.log(userLogInInfo)  

      try{
        var person;
        var upDatedPerson;

        //If client logged in with username
        if(userLogInInfo.email === undefined) {
          const tempPerson = await controller.ifPersonExists(req.body.email, "email")
          if(tempPerson !== undefined) {
            
            throw new Error("Entered email is already taken")
          }
          else {
            person = await controller.ifPersonExists(userLogInInfo.username, 'username');
            upDatedPerson = await controller.upDatePerson(person, req.body)
            res.status(200).json(upDatedPerson)
          }
        }

        //If client loggen in with email
        else if(userLogInInfo.username === undefined) {
          const tempPerson = await controller.ifPersonExists(req.body.username, "username")
          if(tempPerson !== undefined)
            throw new Error("Entered username is already taken")
          else {
            person = await controller.ifPersonExists(userLogInInfo.email, 'email');
            upDatedPerson = await controller.upDatePerson(person, req.body);
            res.status(200).json(upDatedPerson)
          }
        }

        else
          throw new Error("Unable to verify client")
        
      }
      catch(error){
        return res.status(401).json(this.errorHandler.handleError(updateRoute, error));
      }
    });

  }
};

module.exports = PersonAPI;
