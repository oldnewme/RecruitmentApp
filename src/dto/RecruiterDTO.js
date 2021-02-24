class RecruiterDTO{
    constructor(firstName, lastName, email, dob, username, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
        this.username = username;
        this.password = password;
    }

}

module.exports = RecruiterDTO;