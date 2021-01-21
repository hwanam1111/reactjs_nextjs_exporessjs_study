module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'TB_POST',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.User.belongsToMany(db.User, { through: 'TB_LIKE', as: 'PostLikers' });
    db.Post.belongsToMany(db.Hashtag, { through: 'TB_POST_HASHTAG' } );
    db.Post.belongsTo(db.Post, { as: 'RetweetId' });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
  };
  return Post;
};
