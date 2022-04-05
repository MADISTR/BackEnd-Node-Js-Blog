module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('articles', {
    titre: {
      type: DataTypes.STRING,
      unique: true,
    },
    contenu: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
  return Article
}
