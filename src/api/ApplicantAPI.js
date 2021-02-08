const express = require('express');
const router = express.Router();
const controller = require('../controller/Controller');
const ApplicantDTO = require('../dto/ApplicantDTO');

<<<<<<< HEAD

// Gets all applicants
router.get('/', (req, res) => {
    res.json(applicants)
});


// Get applicant with id :id
router.get('/:id', (req, res)=>{
    const found = applicants.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(applicants.filter(member => member.id === parseInt(req.params.id)))
    } else{
        res.status(400).json({msg:`No member with the id ${req.params.id}`})
    }
});



// Create Applicant
router.post('/', (req, res) =>{

    //res.send(req.body)
    
    const newMember = {
        id: uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    }

    if(!newMember.name || !newMember.email){
        res.status(400).json({msg:'Please include a name and email'});
    }

    applicants.push(newMember);
    res.json(applicants)
    
});

module.exports = router;
=======
class ApplicantAPI{
    constructor(){
        this.router = express.Router();
    }

  /**
   * @return {string} The URL paths handled by this request handler.
   */
  get path() {
    return ApplicantAPI.APPLICANT_API_PATH;
  }

  /**
   * @return {string} The URL paths handled by this request handler.
   */
  static get APPLICANT_API_PATH() {
    return '/api/applicant';
  }

  async registerHandler(){
    /**
     * route to create a new account
     */
    this.router.post('/signup', (req, res) => {
        const applicantDTO = new ApplicantDTO(req.body.firstName, req.body.lastName, req.body.email, 
            req.body.dob, req.body.username, req.body.password);
        controller.signup(applicantDTO);
        res.status(200).json({msg:'Account created successfully'});
    });
    
    this.router.post('/login', (req, res) => {
        controller.login(req.body.username, req.body.password);
        res.status(200).json({msg:'user is logged in'});
    });

  }

}

module.exports = ApplicantAPI;
>>>>>>> chris
