const Sequelize = require('sequelize');

/**
 * Defines the competence of a person
 */
class Competence extends Sequelize.Model {
  /**
   * The name of the Competence model.
   */
  static get COMPETENCE_MODEL_NAME() {
    return 'competence';
  }

  /**
   * Defines the competence entity.
   *
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the Competence entity.
   */
  static createModel(sequelize) {
    Competence.init(
        {
          name: {
            type: Sequelize.DATE,
            allowNull: true,
            unique: true
          },
        },
        {sequelize, modelName: Competence.COMPETENCE_MODEL_NAME, paranoid: true}
        
    );
    return Competence;
  }

}
module.exports = Competence;