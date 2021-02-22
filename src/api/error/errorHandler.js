/**
* This class is meant to create an abbreviated error JSON object
* that is seen in the response body of a HTTP request with an error status.
*/
class ErrorHandler{
  // TODO: fill out constructor as needed
  constructor(){}

  /**
  * Return a JSON object for the specific error showing a brief description and
  * the route where this error occurred.
  */
  handleError(errorRoute, error){
    if(error.message === "Validation error"){
      return {error: error.errors[0].message,
              route: errorRoute};
    }
    else{
      return {error: error.message,
              route: errorRoute};
    }
  }

}

module.exports = ErrorHandler;
