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

      /* TODO: finish method so that login returns success for correct credentials
      and error if not
      */
      async login(username, password){

    }
 }

 const controller = new Controller();
 controller.createController();
 module.exports = controller;
