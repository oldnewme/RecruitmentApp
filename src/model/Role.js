const Sequelize = require('sequelize');
const Person = require('./Person');

/**
 * A user of the chat application.
 */
class Role extends Sequelize.Model {
  /**
   * The name of the User model.
   */
  static get ROLE_MODEL_NAME() {
    return 'role';
  }

  /**
   * Defines the person entity.
   *
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the Role entity.
   */
  static createModel(sequelize) {
    Role.init(
        {
          name: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
          },

        },
        {sequelize, modelName: Role.ROLE_MODEL_NAME, paranoid: true}
        
    );
    
    
    return Role;
  }

}
module.exports = Role;