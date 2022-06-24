import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index'; //방금 만들어주었던 sequelize객체 임포트

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
