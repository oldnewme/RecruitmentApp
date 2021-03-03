/**
 * An Person that will use the system
 */

class PersonDTO{
    /**
     * 
     * @param {PersonDTO} personDTO a data transfer object containing info needed
     * to register an person 
     */
    constructor({firstName, lastName, email, dob, role, username, password}){
        this.name = firstName;
        this.surname = lastName;
        this.email = email;
        this.ssn = dob;
        this.roleId = role;
        this.username = username;
        this.password = password;
    }
}

module.exports = PersonDTO;