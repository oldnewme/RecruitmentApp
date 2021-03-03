<<<<<<< HEAD
/**
 * An Applicant that will send in job application(s)
 */

class ApplicantDTO{
    /**
     * 
     * @param {ApplicantDTO} applicantDTO a data transfer object containing info needed
     * to register an applicant 
     */
    constructor({firstName, lastName, email, dob, username, password}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
        this.username = username;
        this.password = password;
    }
}

module.exports = ApplicantDTO;
=======
/**
 * An Applicant that will send in job application(s)
 */

class ApplicantDTO{
    /**
     *
     * @param {ApplicantDTO} applicantDTO a data transfer object containing info needed
     * to register an applicant
     */
    constructor({firstName, lastName, email, dob, username, password}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
        this.username = username;
        this.password = password;
    }
}

module.exports = ApplicantDTO;
>>>>>>> 647ded02b0c1adcd74473a2222a987743ee64fed
