import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from './index'; //방금 만들어주었던 sequelize객체 임포트
import { Users } from './user.model';
import { Posts } from './post.model';

// // These are all the attributes in the User model
interface CommentsAttributes {
    id: number;
    postId: number;
    userId: number;
    content: string;
}

export class Comments extends Model<CommentsAttributes> {
    public readonly id!: number; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public postId!: number;
    public userId!: number;
    public title!: string;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static associations: {
        userHasManyPosts: Association<Users, Posts>;
        userHasManyComments: Association<Users, Comments>;
        postHasManyComments: Association<Posts, Comments>;
    };
}
//----------------------------
Comments.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        postId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        modelName: 'comments',
        tableName: 'comments',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    }
);

Users.hasMany(Posts, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'userHasManyPosts',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Posts.belongsTo(Users);

Users.hasMany(Comments, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'userHasManyComments',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Comments.belongsTo(Users);

Posts.hasMany(Comments, {
    sourceKey: 'id',
    foreignKey: 'postId',
    as: 'postHasManyComments',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Comments.belongsTo(Posts);
