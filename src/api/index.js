const PersonAPI = require('./PersonAPI');

/**
 * Class that is used to load all requesthandlers
 */

 class RequestHandlerLoader{
     /**
      * Constructor that creates a new instance of the class
      */
     constructor(){
         this.reqHandlers = [];
     }

     /**
      * Adds requesthandler
      * @param {RequestHandler} reqHandler The request handler that is to be added
      */
     addRequestHandler(reqHandler) {
         this.reqHandlers.push(reqHandler);
     }

     /**
      * Makes requesthandlers available to express object
      * 
      * @param {Application} app the express application that hosts request handlers
      */

      loadHandlers(app){
          this.reqHandlers.forEach((reqHandler) =>{
              reqHandler.registerHandler();
              app.use(reqHandler.path, reqHandler.router);
          });
        }
 }
 const loader = new RequestHandlerLoader();
 loader.addRequestHandler(new PersonAPI());

 module.exports = loader;