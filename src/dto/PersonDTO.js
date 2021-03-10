/**
 * An Person that will use the system
 */

class PersonDTO{
    /**
     * 
     * @param {PersonDTO} personDTO a data transfer object containing info needed
     * to register an person 
     */
    constructor({name, surname, email, ssn, role, username, password}){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.ssn = ssn;
        this.roleId = role;
        this.username = username;
        this.password = password;
    }
}

module.exports = PersonDTO;