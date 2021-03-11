'use strict';

const assert = require('assert').strict;
const validator = require('validator');

/**
 */
class Validators {
    /**
     * 
     * @param {*} email 
     */
    static isEmail(email){
        try {
            assert(validator.isEmail(email));
        } catch (error) {
            throw new Error('email is not valid format')
        }
        
    }

    static isValidPassword(password){
        try {
            assert(password.length > 7);
        } catch (error) {
            throw new Error('Password must contain at least 8 characters')
        }
    }

    static isValidSSN(ssn){
        try {
            let year = ssn.substr(0, 4);
            let month = ssn.substr(4,2);
            let day = ssn.substr(6, 2);
            assert(validator.isInt(year, {gt: 1900, lt: 2006}))
            assert(validator.isInt(month, {gt: 0, lt: 13}))
            assert(validator.isInt(day, {gt: 0, lt: 32}))
            assert(ssn.length == 8);
        } catch (error) {
            throw new Error('date of birth must be ten numbers and a valid date between 19000101 and 20051231')
        }
    }

    static isAlphaNumeric(username){
        try {
            assert(validator.isAlphanumeric(username));
        } catch (error) {
            throw new Error("username must be alphanumeric characters")
        }
       
    }
    
    static validName(name, surname){
        try {
            assert(validator.isAlpha(name));
            assert(validator.isAlpha(surname));
            assert(name.length < 26 && surname.length < 26)
        } catch (error) {
            console.log(error)
            throw new Error("Both first and last name must only contain alphabetic characters, " 
            + "and be at most 25 characters each ")
        }
    }


}

module.exports = Validators;