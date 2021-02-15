const Sequelize = require('sequelize');

/**
 * A user of the chat application.
 */
class Recruiter extends Sequelize.Model {
  /**
   * The name of the User model.
   */
  static get RECRUITER_MODEL_NAME() {
    return 'recruiter';
  }

  /**
   * Defines the Recruiter entity.
   *
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the User entity.
   */
  static createModel(sequelize) {
    Recruiter.init(
        {
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          dob: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          username: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },
        {sequelize, modelName: Recruiter.RECRUITER_MODEL_NAME, paranoid: true}
    );
    return Recruiter;
  }
}

module.exports = Recruiter;