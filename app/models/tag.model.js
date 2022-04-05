module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tags', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  })
  return Tag
}
