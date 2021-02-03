const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const applicants = require('../integration/ApplicantDB')


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