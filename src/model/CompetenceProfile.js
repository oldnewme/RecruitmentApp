const Sequelize = require('sequelize');
const Person = require('./Person');
const Competence = require('./Competence');
/**
 * Defines the CompetenceProfile of a person
 */
class CompetenceProfile extends Sequelize.Model {
  /**
   * The name of the CompetenceProfile model.
   */
  static get COMPETENCE_PROFILE_MODEL_NAME() {
    return 'competence_profile';
  }

  /**
   * Defines the CompetenceProfile entity.
   *
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the CompetenceProfile entity.
   */
  static createModel(sequelize) {
    CompetenceProfile.init(
        {
          years_of_experience: {
            type: Sequelize.DECIMAL(4,2),
            allowNull: true,
            unique: true
          },
        },
        {sequelize, modelName: CompetenceProfile.COMPETENCE_PROFILE_MODEL_NAME, paranoid: true}
        
    );
    CompetenceProfile.belongsTo(Person);
    CompetenceProfile.belongsTo(Competence);
    return CompetenceProfile;
  }

}
module.exports = CompetenceProfile;