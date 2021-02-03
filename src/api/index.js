const ApplicantAPI = require('./ApplicantAPI');
const RecruiterAPI = require('./RecruiterAPI');



class RequestHandlerLoader{
    constructor(){
        this.reqHandlers = [];
    }

    addRequestHandler(reqHandler){
        this.reqHandlers.push(reqHandler);
    }
}

const loader = new RequestHandlerLoader();
loader.addRequestHandler(new ApplicantAPI());
loader.addRequestHandler(new RecruiterAPI());

module.exports = loader;