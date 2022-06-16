import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from './index'; //방금 만들어주었던 sequelize객체 임포트
import { Users } from './user.model';

// // These are all the attributes in the User model
interface PostsAttributes {
    id: number;
    userId: number;
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    incident_date: Date | null;
}

export class Posts extends Model<PostsAttributes> {
    public readonly id!: number; //굳이 안넣어줘도 될 것 같지만 공식문서에 있으니깐 일단 넣어줌.
    public userId!: number;
    public title!: string;
    public content!: string;
    public latitude!: number;
    public longitude!: number;
    public incident_date!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associations: { userHasManyPosts: Association<Users, Posts> };
}
//----------------------------
Posts.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DECIMAL(16, 14),
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(17, 14),
            allowNull: true,
        },
        incident_date: {
            type: DataTypes.DATE(),
            allowNull: true,
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        modelName: 'posts',
        tableName: 'posts',
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
