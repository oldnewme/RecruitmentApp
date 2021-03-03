const Sequelize = require('sequelize');
const Person = require('./Person');

/**
 * A role that a person can have application.
 */
class Role extends Sequelize.Model {
  /**
   * The name of the Role model.
   */
  static get ROLE_MODEL_NAME() {
    return 'role';
  }

  /**
   * Defines the role entity.
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