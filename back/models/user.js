module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(254),
      allowNull: false, // 필수
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    tableName: 'TB_USER',
    charset: 'utf8',
    collate: 'utf8_general_ci' // 한글 저장
  });

  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'TB_LIKE', as: 'LikedPost' } );
    db.User.belongsToMany(db.User, { through: 'TB_FOLLOW', as: 'Followers', foreignKey: 'FollweringId' } );
    db.User.belongsToMany(db.User, { through: 'TB_FOLLOW', as: 'Followings', foreignKey: 'FollwerId' } );
  };
  return User;
};
