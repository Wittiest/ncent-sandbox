'use strict';
module.exports = (sequelize, DataTypes) => {
  const TokenType = sequelize.define('TokenType', {
    name: {
	    type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    uuid: {
	    type: DataTypes.UUID,
	    primaryKey: true,
	    allowNull: false,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sponsorUuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalTokens: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {min: 0}
    },
  });
  TokenType.associate = (models) => {
    TokenType.hasMany(models.Transaction, {
	    foreignKey: 'tokenTypeUuid',
	    as: 'transactions',
    });
  };
  sequelize.sync();
  return TokenType;
};
