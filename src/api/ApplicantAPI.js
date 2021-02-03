const RequestHandler = require('./RequestHandler');

/**
 * Defines REST API with endpoints related to Applicants
 */

 class ApplicantAPI extends RequestHandler{
     /**
      * Instantiates a new instance
      */
     constructor(){
         super();
     }

     /**
      * @return {string} the URL paths handled by this request handler
      */
     get path(){
         return ApplicantAPI.APPLICANT_API_PATH;
     }

     /**
      * @return {string} The url paths handled by this request handler
      */

      static get APPLICANT_API_PATH(){
          '/applicant'
      }

 }