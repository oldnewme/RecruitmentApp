const Sequelize = require('sequelize');
const Person = require('./Person');

/**
 * Defines period when person is available
 */
class Availability extends Sequelize.Model {
  /**
   * The name of the Availability model.
   */
  static get AVAILABILITY_MODEL_NAME() {
    return 'availability';
  }

  /**
   * Defines the availiability entity.
   *
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the availability entity.
   */
  static createModel(sequelize) {
    Availability.init(
        {
          from_date: {
            type: Sequelize.DATE,
            allowNull: true,
            unique: true
          },
          to_date: {
            type: Sequelize.DATE,
            allowNull: true,
            unique: true
          },

        },
        {sequelize, modelName: Availability.AVAILABILITY_MODEL_NAME, paranoid: true}
        
    );
    
    Availability.belongsTo(Person);
    return Availability;
  }

}
module.exports = Availability;