const express = require('express');
const controller = require('../controller/Controller');

class UserAPI{
  constructor(){
      this.router = express.Router();
  }

  /**
   * @return {string} The URL paths handled by this request handler.
   */
  get path() {
    return UserAPI.APPLICANT_API_PATH;
  }

  /**
   * @return {string} The URL paths handled by this request handler.
   */
  static get APPLICANT_API_PATH() {
    return '/api/';
  }
}

module.exports = UserAPI;
