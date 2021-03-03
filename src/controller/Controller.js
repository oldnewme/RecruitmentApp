const ApplicationDAO = require('../integration/ApplicationDAO');
const applicants = require('../integration/ApplicantDB');

/**
 * The controller for the application that is the sole caller of
 * the model and integration layer
 */

 class Controller {

    /**
     * Used to create new instance of controller class
     */
     constructor(){
         this.applicationDAO = new ApplicationDAO();
     }

     /**
      * Instantiates a controller object
      */
    async createController(){
         console.log('tables created')
         await this.applicationDAO.createTables();
     }

     /**
      * Signs up new user
      * @param {ApplicantDTO} applicantDTO dto containing user information
      */
      async signup(applicantDTO){
          try {
            return await this.applicationDAO.createUser(applicantDTO);
          } catch (error) {
            throw error;
          }
      }

      
      /**
      * Signs up new user
      * @param {PersonDTO} personDTO dto containing user information
      */
     async signupPerson(personDTO, roleId){
      try {
        return await this.applicationDAO.createPerson(personDTO, roleId);
      } catch (error) {
        throw error;
      }
  }

       /**
       * Retrieves a person from the database
       * @param {Username} username The username of the of 
       * the person to be retrieved from the database
       */
      async getPerson(username){
        try{
          return await this.applicationDAO.getPerson(username)
        }
        catch(error){
          throw error;
        }
    }

      /**
       * Retrieves a user from the database
       * @param {Username} username The username of the of 
       * the person to be retrieved from the database
       */
      async getApplicant(username){
        try{
          return await this.applicationDAO.getApplicant(username)
        }
        catch(error){
          throw error;
        }
    }
 }

 const controller = new Controller();
 controller.createController();
 module.exports = controller;
