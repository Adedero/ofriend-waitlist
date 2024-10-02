// models/Visitor.js

module.exports = (sequelize, DataTypes) => {
  const Visitor = sequelize.define('Visitor', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referrer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitTimestamp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Visitor;
};
