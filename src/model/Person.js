const Sequelize = require('sequelize');
const Role = require('./Role');

/**
 * A user of the chat application.
 */
class Person extends Sequelize.Model {
  /**
   * The name of the User model.
   */
  static get PERSON_MODEL_NAME() {
    return 'person';
  }

  /**
   * Defines the person entity.
   *
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the Person entity.
   */
  static createModel(sequelize) {
    Person.init(
        {
          name: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          surname: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          ssn: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
          },
          email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },

        },
        {sequelize, modelName: Person.PERSON_MODEL_NAME, paranoid: false}
        //cannot be paranoid for testing
    );
    Person.belongsTo(Role);
    return Person;
  }
}
module.exports = Person;
