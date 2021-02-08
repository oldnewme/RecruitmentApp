const Sequelize = require('sequelize');

/**
 * A user of the chat application.
 */
class Applicant extends Sequelize.Model {
  /**
   * The name of the User model.
   */
  static get APPLICANT_MODEL_NAME() {
    return 'applicant';
  }

  /**
   * Defines the Applicant entity.
   *
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the User entity.
   */
  static createModel(sequelize) {
    Applicant.init(
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
        {sequelize, modelName: Applicant.APPLICANT_MODEL_NAME, paranoid: true}
    );
    return Applicant;
  }
}

module.exports = Applicant;