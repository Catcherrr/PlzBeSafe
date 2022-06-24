import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from './index'; //방금 만들어주었던 sequelize객체 임포트
import { Users } from './user.model';
import { Posts } from './post.model';
import { Comments } from './comment.model';
import { Recomments } from './recomment.model';
import { PostReactions } from './post.reaction.model';
import { CommentReactions } from './comment.reaction.model';

// // These are all the attributes in the User model
interface RecommentReactionsAttributes {
    id: number;
    recommentId: number | null;
    userId: number;
    type: string;
}

export class RecommentReactions extends Model<RecommentReactionsAttributes> {
    public readonly id!: number; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public recommentId!: number;
    public userId!: number;
    public type!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static associations: {
        userHasManyPosts: Association<Users, Posts>;
        userHasManyComments: Association<Users, Comments>;
        userHasManyRecomments: Association<Users, Recomments>;
        userHasManyPostReactions: Association<Users, PostReactions>;
        userHasManyCommentReactions: Association<Users, CommentReactions>;
        userHasManyRecommentReactions: Association<Users, RecommentReactions>;
        postHasManyComments: Association<Posts, Comments>;
        postHasManyPostReactions: Association<Posts, PostReactions>;
        commentHasManyRecomments: Association<Comments, Recomments>;
        commentHasManyCommentReactions: Association<Comments, CommentReactions>;
        recommentHasManyReactions: Association<Recomments, RecommentReactions>;
    };
}
//----------------------------
RecommentReactions.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recommentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    },
    {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        modelName: 'recomment-reactions',
        tableName: 'recomment-reactions',
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

Users.hasMany(Recomments, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'userHasManyRecomments',
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
Recomments.belongsTo(Users);

Users.hasMany(PostReactions, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'userHasManyPostReactions',
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
PostReactions.belongsTo(Users);

Users.hasMany(CommentReactions, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'userHasManyCommentReactions',
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
CommentReactions.belongsTo(Users);

Users.hasMany(RecommentReactions, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'userHasManyRecommentReactions',
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
RecommentReactions.belongsTo(Users);

Posts.hasMany(Comments, {
    sourceKey: 'id',
    foreignKey: 'postId',
    as: 'postHasManyComments',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Comments.belongsTo(Posts);

Posts.hasMany(PostReactions, {
    sourceKey: 'id',
    foreignKey: 'postId',
    as: 'postHasManyReactions',
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
PostReactions.belongsTo(Posts)

Comments.hasMany(Recomments, {
    sourceKey: 'id',
    foreignKey: 'commentId',
    as: 'commentHasManyRecomments',
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
Recomments.belongsTo(Comments)

Comments.hasMany(CommentReactions, {
    sourceKey: 'id',
    foreignKey: 'commentId',
    as: 'commentHasManyCommentReactions',
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
CommentReactions.belongsTo(Comments);

Recomments.hasMany(RecommentReactions, {
    sourceKey: 'id',
    foreignKey: 'recommentId',
    as: 'recommentHasManyRecommentReactions',
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
RecommentReactions.belongsTo(Recomments)