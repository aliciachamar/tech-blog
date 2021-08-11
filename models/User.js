const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword (loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                try {
                   const salt = bcrypt.genSalt(10);
                   newUserData.password = await bcrypt.hash(newUserData.password, salt);
                   return newUserData;
                } catch (e) {
                    return e;
                }
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;