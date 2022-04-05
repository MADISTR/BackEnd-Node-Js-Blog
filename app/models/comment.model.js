module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    email: {
      type: DataTypes.STRING,
    },
    contenu: {
      type: DataTypes.TEXT,
    },
  })
  return Comment
}
