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
            console.log(error)
            throw error;
          }  
      }

      /**
       * Retrieves a user from the database
       * @param {Username} username The username of the of 
       * the person to be retrieved from the database
       */
      async getApplicant(username){
          return await this.applicationDAO.getApplicant(username)
    }
 }

 const controller = new Controller();
 controller.createController();
 module.exports = controller;
