import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index'; //방금 만들어주었던 sequelize객체 임포트

// // These are all the attributes in the User model
interface PostReactionsAttributes {
    id: number;
    postId: number | null;
    userId: number;
    type: string;
}

export class PostReactions extends Model<PostReactionsAttributes> {
    public readonly id!: number; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public postId!: number;
    public userId!: number;
    public type!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static associations: {
    };
}
//----------------------------
PostReactions.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        postId: {
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
        modelName: 'post-reactions',
        tableName: 'post-reactions',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    }
);
