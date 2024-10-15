import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

interface UserAttributes extends InferAttributes<User> {}
interface UserCreationAttributes extends InferCreationAttributes<User> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'User'
});

interface PostAttributes extends InferAttributes<Post> {}
interface PostCreationAttributes extends InferCreationAttributes<Post> {}

class Post extends Model<PostAttributes, PostCreationAttributes> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare userId: number;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Post'
});

interface CommentAttributes extends InferAttributes<Comment> {}
interface CommentCreationAttributes extends InferCreationAttributes<Comment> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare postId: number;
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Comment'
});

// Define the relationships
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

const UserPost = sequelize.define('UserPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

User.belongsToMany(Post, { through: UserPost, foreignKey: 'userId' });
Post.belongsToMany(User, { through: UserPost, foreignKey: 'postId' });

// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });
